from rest_framework import serializers
from .models import Board, Card

class BoardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Board
    fields = ('id', 'title', 'description')

class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = ('id', 'description', 'completed')