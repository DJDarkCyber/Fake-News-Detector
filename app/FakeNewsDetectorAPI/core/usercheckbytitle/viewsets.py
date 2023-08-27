from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import UserCheckSerializer
from core.model import load_models

class UserCheckViewSet(viewsets.ViewSet):
    """Viewset to handle user checking other news."""
    http_method_names = ('post', )
    serializer_class = UserCheckSerializer
    nb_model, vect_model = load_models()

    def create(self, request):
        """Get's news from user and returns predicted value."""
        serializer = UserCheckSerializer(data=request.data)
        if serializer.is_valid():
            input_data = serializer.validated_data['user_news']
            input_data = [input_data]
            vectorized_text = self.vect_model.transform(input_data)
            prediction = self.nb_model.predict(vectorized_text)
            prediction_bool = True if prediction[0] == 1 else False
            
            response_data = {'prediction': prediction_bool}
            return Response(response_data)
        else:
            return Response(serializer.errors, status=400)
