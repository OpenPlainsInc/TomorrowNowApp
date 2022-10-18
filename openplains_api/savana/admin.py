from django.contrib import admin
# Register your models here.
from .models import OpenPlainsModel, Goal, ModelGoal, ModelExtent


class ModelAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "status", "privacy")


class GoalAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "status", "privacy")


class ModelGoalAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "privacy", "goal", "model")


class ModelExtentAdmin(admin.ModelAdmin):
    list_display = ("model", "county")
    search_fields = ("model",)
    list_filter = ('model',)
    autocomplete_fields = ('county',)


admin.site.register(OpenPlainsModel, ModelAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(ModelGoal, ModelGoalAdmin)
admin.site.register(ModelExtent, ModelExtentAdmin)
