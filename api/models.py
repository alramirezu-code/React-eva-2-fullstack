from django.db import models

class objeto(models.Model):
    nombre = models.CharField(max_length=150)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nombre} - Cantidad: {self.cantidad}"

# Create your models here.
