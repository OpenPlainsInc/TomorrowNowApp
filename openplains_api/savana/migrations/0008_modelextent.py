# Generated by Django 4.1.2 on 2022-10-17 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0006_alter_county_geom'),
        ('savana', '0007_alter_modelgoal_model'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelExtent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='county', to='world.county')),
                ('model', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='counties', to='savana.openplainsmodel')),
            ],
        ),
    ]