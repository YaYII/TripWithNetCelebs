import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import BertModel, BertTokenizer
from torchvision import models
import numpy as np

class MultiModalEmotionRecognitionEngine:
    def __init__(self):
        # 初始化各个模态的模型
        self.face_model = FaceEmotionModel()
        self.text_model = TextEmotionModel()
        self.audio_model = AudioEmotionModel()
        self.fusion_model = ModalityFusionModel()
        
    def process(self, face_data=None, text_data=None, audio_data=None):
        """处理多模态输入数据并返回融合后的情绪识别结果"""
        emotion_features = []
        
        # 处理面部表情数据
        if face_data is not None:
            face_emotion = self.face_model(face_data)
            emotion_features.append(face_emotion)
            
        # 处理文本数据
        if text_data is not None:
            text_emotion = self.text_model(text_data)
            emotion_features.append(text_emotion)
            
        # 处理音频数据
        if audio_data is not None:
            audio_emotion = self.audio_model(audio_data)
            emotion_features.append(audio_emotion)
            
        # 多模态特征融合
        if emotion_features:
            fused_emotion = self.fusion_model(emotion_features)
            return fused_emotion
        else:
            raise ValueError("No input data provided")

class FaceEmotionModel(nn.Module):
    def __init__(self):
        super(FaceEmotionModel, self).__init__()
        # 使用预训练的ResNet作为特征提取器
        self.resnet = models.resnet50(pretrained=True)
        # 修改最后的全连接层以适应情绪分类
        self.resnet.fc = nn.Linear(2048, 7)  # 7种基本情绪
        
        # 添加注意力机制
        self.attention = SpatialAttention()
        
    def forward(self, x):
        # 提取特征
        features = self.resnet.conv1(x)
        features = self.resnet.bn1(features)
        features = self.resnet.relu(features)
        features = self.resnet.maxpool(features)
        
        # 应用注意力机制
        attention_weights = self.attention(features)
        features = features * attention_weights
        
        # 继续前向传播
        features = self.resnet.layer1(features)
        features = self.resnet.layer2(features)
        features = self.resnet.layer3(features)
        features = self.resnet.layer4(features)
        
        # 全局平均池化
        features = F.adaptive_avg_pool2d(features, (1, 1))
        features = torch.flatten(features, 1)
        
        # 情绪分类
        emotions = self.resnet.fc(features)
        return emotions

class TextEmotionModel(nn.Module):
    def __init__(self):
        super(TextEmotionModel, self).__init__()
        # 使用预训练的BERT模型
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(768, 7)  # 7种基本情绪
        
    def forward(self, input_ids, attention_mask):
        # BERT编码
        outputs = self.bert(input_ids=input_ids,
                          attention_mask=attention_mask)
        
        # 获取[CLS]标记的输出作为句子表示
        pooled_output = outputs[1]
        pooled_output = self.dropout(pooled_output)
        
        # 情绪分类
        emotions = self.classifier(pooled_output)
        return emotions

class AudioEmotionModel(nn.Module):
    def __init__(self):
        super(AudioEmotionModel, self).__init__()
        # 音频特征提取CNN
        self.conv1 = nn.Conv2d(1, 64, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        
        # LSTM用于时序特征建模
        self.lstm = nn.LSTM(input_size=128,
                          hidden_size=64,
                          num_layers=2,
                          batch_first=True,
                          bidirectional=True)
                          
        self.classifier = nn.Linear(128, 7)  # 7种基本情绪
        
    def forward(self, x):
        # CNN特征提取
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.pool(x)
        
        # 准备LSTM输入
        batch_size, channels, height, width = x.size()
        x = x.view(batch_size, height, channels * width)
        
        # LSTM处理
        lstm_out, _ = self.lstm(x)
        
        # 取最后一个时间步的输出
        last_hidden = lstm_out[:, -1, :]
        
        # 情绪分类
        emotions = self.classifier(last_hidden)
        return emotions

class ModalityFusionModel(nn.Module):
    def __init__(self):
        super(ModalityFusionModel, self).__init__()
        self.attention = MultiHeadAttention(d_model=256, num_heads=8)
        self.fusion_layer = nn.Linear(256, 7)  # 7种基本情绪
        
    def forward(self, features):
        # 特征对齐和注意力融合
        aligned_features = self.align_features(features)
        attended_features = self.attention(aligned_features,
                                         aligned_features,
                                         aligned_features)
        
        # 最终情绪分类
        fused_emotions = self.fusion_layer(attended_features)
        return fused_emotions
        
    def align_features(self, features):
        """将不同模态的特征对齐到相同的维度"""
        aligned = []
        for feature in features:
            # 使用线性层将特征映射到相同维度
            if feature.size(-1) != 256:
                alignment_layer = nn.Linear(feature.size(-1), 256).to(feature.device)
                feature = alignment_layer(feature)
            aligned.append(feature)
        return torch.stack(aligned)

class SpatialAttention(nn.Module):
    def __init__(self):
        super(SpatialAttention, self).__init__()
        self.conv = nn.Conv2d(1, 1, kernel_size=7, padding=3)
        
    def forward(self, x):
        # 计算空间注意力权重
        avg_pool = torch.mean(x, dim=1, keepdim=True)
        max_pool, _ = torch.max(x, dim=1, keepdim=True)
        attention = torch.cat([avg_pool, max_pool], dim=1)
        attention = self.conv(attention)
        attention = torch.sigmoid(attention)
        return attention

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        
        assert d_model % num_heads == 0
        
        self.d_k = d_model // num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
    def forward(self, Q, K, V):
        batch_size = Q.size(0)
        
        # 线性变换
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k)
        
        # 转置以便进行注意力计算
        Q = Q.transpose(1, 2)
        K = K.transpose(1, 2)
        V = V.transpose(1, 2)
        
        # 计算注意力分数
        scores = torch.matmul(Q, K.transpose(-2, -1)) / np.sqrt(self.d_k)
        attention = F.softmax(scores, dim=-1)
        
        # 应用注意力权重
        context = torch.matmul(attention, V)
        
        # 重塑和连接
        context = context.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        
        # 最终线性变换
        output = self.W_o(context)
        return output