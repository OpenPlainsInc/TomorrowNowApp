from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from django.db.models import F
from django.utils import timezone

from rest_framework import generics, filters

from .models import Choice, Question
from .serializers import QuestionSerializer


def _template_name(tmpname):
    return f'grassapp/{tmpname}.html'


### Generic Views
class IndexView(generic.ListView):
    template_name = _template_name('index')
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """
        Return the last five published questions (not including those set to be
        published in the future).
        """
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = _template_name('detail')

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = _template_name('results')


class QuestionsAPIView(generics.ListCreateAPIView):
    search_fields = ['question_text']
    filter_backends = (filters.SearchFilter,)
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

### Original Views
# def index(request):
#     latest_question_list = Question.objects.order_by('-pub_date')[:5]
#     context = {'latest_question_list': latest_question_list}
#     return render(request, _template_name('index'), context)

# # def detail(request, question_id):
# #     return HttpResponse(f"You're looking at question {question_id}.")

# def detail(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     return render(request, _template_name('detail'), {'question': question})

# def results(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     return render(request, 'grassapp/results.html', {'question': question})


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'grassapp/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes = F('votes') + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('grassapp:results', args=(question.id,)))

# def find(request):
#     return HttpResponse(str(request))
