from core.newsquiz.models import NewsQuizData
import pandas as pd
from django.core.management.base import BaseCommand
import pandas as pd


class Command(BaseCommand):
    help = 'Load data from CSV file to NewsQuizData model'

    def add_arguments(self, parser):
        parser.add_argument('csv_file_path', type=str, help='Path to the CSV file')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file_path']
        df = pd.read_csv(csv_file_path)
    
        for index, row in df.iterrows():
            NewsQuizData.objects.create(
                news_title=row['title'],
                news_description=row['text'],
                label=row['label']
            )
            # Add other fields as needed

        self.stdout.write(self.style.SUCCESS('Successfully loaded data from CSV'))
