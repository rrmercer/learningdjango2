from django.db import models
from django.forms import ModelForm

class Board(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()

  def _str_(self):
    return self.title

class Card(models.Model):
  board = models.ForeignKey(Board, on_delete=models.CASCADE)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.description

class CardForm(ModelForm):
    class Meta:
        model = Card
        fields = ['description', 'completed']


class BoardForm(ModelForm):
    class Meta:
        model = Board
        fields = ['description', 'title']