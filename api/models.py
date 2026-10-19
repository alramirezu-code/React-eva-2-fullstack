from django.db import models

class objeto(models.Model):
    nombre = models.CharField(max_length=150)
    cantidad = models.IntegerField(default=0)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.nombre} - Cantidad: {self.cantidad} - Precio: ${self.precio}"
# Create your models here.
