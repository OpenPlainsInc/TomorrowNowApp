from django.contrib import admin


# Register your models here.
from .models import OpenPlainsModel, Goal, ModelGoal


class ModelAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "status", "privacy")


class GoalAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "status", "privacy")


class ModelGoalAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "privacy", "goal", "model")


admin.site.register(OpenPlainsModel, ModelAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(ModelGoal, ModelGoalAdmin)
