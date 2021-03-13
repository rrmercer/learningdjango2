from django.db import models
from django.forms import ModelForm

class Board(models.Model):
  title = models.CharField(max_length=120,blank=True)
  description = models.TextField(blank=True)

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

# To add a board:
#curl -d "title=test-title&description=abcd" -X POST http://localhost:8000/boards/add
#curl -d "title=test-title&description=abcd&board_id=1" -X POST http://localhost:8000/boards/add_card
#curl -X DELETE http://localhost:8000/boards/delete/17
