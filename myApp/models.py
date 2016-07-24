from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Categorias(models.Model):
	#Atributos
	nombre = models.CharField(max_length=25)
	descripcion = models.CharField(max_length=140)
	def __str__(self):
		return self.nombre

class Publicacion(models.Model):
	#Conexiones a otros Modelos
	categoria = models.ForeignKey(Categorias, related_name='categoria_de_la_publicacion')
	#Atributos
	descripcion = models.CharField(max_length=400)
	hora = models.DateField(auto_now_add=True)
	lugar = models.CharField(max_length=120)
	def __str__(self):
		return self.lugar


