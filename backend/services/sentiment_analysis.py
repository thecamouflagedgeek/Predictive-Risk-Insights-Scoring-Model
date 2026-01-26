# sentiment_analysis.py

red_flag_words = [
    'gambling',
    'overdue',
    'desperate'
]

green_flag_words = [
    'business',
    'growth',
    'medical'
]


def vibe_check(text):
    red_flags = sum(word in text.lower() for word in red_flag_words)
    green_flags = sum(word in text.lower() for word in green_flag_words)
    
    if red_flags > green_flags:
        return 'Red Flag'
    elif green_flags > red_flags:
        return 'Green Flag'
    else:
        return 'Neutral'
