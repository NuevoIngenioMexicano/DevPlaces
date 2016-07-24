from __future__ import unicode_literals

from django.forms import ModelForm
from . import models
from django.utils.translation import ugettext_lazy as _
from django import forms
from .models import Publicacion



class Crear(ModelForm):
	class Meta:
		model = models.Publicacion

		fields = ['lugar','descripcion','categoria']
		labels = {
			'lugar':_('¿En donde estas?'),
			'descripcion':_('¿Que esta pasando?'),
			'categoria':_('Clasifica tu Evento')
		}
		widgets = {
			'lugar': forms.TextInput(attrs={'class':'form-control','placeholder':'Lugar'}),
			'descripcion': forms.TextInput(attrs={'class':'form-control','placeholder':'Descripcion'}),
			'categoria': forms.Select(attrs={'class':'form-control','placeholder':'Categoria'} )
		}