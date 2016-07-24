from django.shortcuts import render
from . import models
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from .forms import Crear

#Create your views here.

def crear(request):
	template_name = 'index2.html'
	todo = models.Publicacion.objects.all()
	context = {
		'todo':todo			
	}
	return render(request, template_name, context)
	

@csrf_exempt
def ver(request):
	template_name = 'crear2.html'
	form = Crear()
	context = {
		'form':form
	}
	if request.method == 'POST':
		form = Crear(request.POST)
		if form.is_valid:
			form.save()

	return render(request, template_name, context)

def detalle(request, pk):
	template_name = 'detalle.html'
	detalle = models.Publicacion.objects.get(pk = pk)
	context = {
		'detalle':detalle
	}
	return render(request, template_name, context)