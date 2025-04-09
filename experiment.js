// experiment.js

// Dane eksperymentu
const wordLists = {
    "LEKARZ": ["choroba", "pielęgniarka", "stetoskop", "doktor", "kitel", "pomoc", "fartuch", "szpital", "słuchawki", "recepta", "specjalista", "zdrowie", "pediatra", "pacjent", "lek"],
    "WYSOKI": ["niski", "mężczyzna", "chłopak", "brunet", "dąb", "koszykarz", "poziom", "słup", "przystojny", "budynek", "siatkarz", "szczupły", "długi", "wieżowiec", "drabina"],
    "ŻYCZENIE": ["marzenie", "prezent", "urodziny", "ostatnie", "rozkaz", "święta", "kartka", "magia", "spełnienie", "wróżba", "rybka", "nadzieja", "prośba", "gwiazdka", "pragnienie"],
    "GWIZDEK": ["mecz", "w-f", "sędzia", "głośny", "hałas", "trener", "koniec", "dźwięk", "sport", "policjant", "gwizd", "czajnik", "świst", "sygnał", "piłka"]
};

const narratives = {
    "LEKARZ": {
        "critical": "Wyobraź sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. W pomieszczeniu obok ktoś ubrany na biało słucha staruszki opisującej kaszel. Przez korytarz przechodzi pacjent z receptą w dłoni, którą wypisał mu ktoś przed chwilą. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "non_critical": "Wyobraź sobie, że siedzisz w zatłoczonej poczekalni szpitala. Przez uchylone drzwi gabinetu widzisz pielęgniarkę, która pobiera krew nastolatkowi. Przez korytarz przechodzi pacjent z czymś w ręku. To pewnie recepta, na leki, których koniecznie potrzebuje. Czekasz na pomoc, a chłodne powietrze i stukot klawiatur sprawiają, że chcesz jak najszybciej iść do domu.",
        "neutral": "Wyobraź sobie, że siedzisz w cichej czytelni biblioteki. Przez półotwarte drzwi widzisz osobę układającą książki na półce. Obok Ciebie studentka przewraca strony notesu, szukając ważnego cytatu. Na środku stolik z gazetami, a przez okno wpada ciepłe światło poranka. Czekasz na otwarcie archiwum, a szelest papieru i zapach kawy sprawiają, że czujesz się wspaniale."
    },
    "WYSOKI": {
        "critical": "Wyobraź sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Wielki koszykarz rozciąga się przed meczem, opierając dłonie o słup, który sięga ponad korony drzew. Dookoła parku stoją ogromne wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Zastanawiasz się, jak ludzie wznoszą takie budynki, które wydają się dotykać nieba.",
        "non_critical": "Wyobraź sobie, że przechodzisz przez park w centrum miasta. Obok ciebie mężczyzna w koszulce sportowej przygotowuje się do gry. Koszykarz rozciąga się przed meczem, opierając dłonie o słup, który stoi przy boisku. Dookoła parku stoją wieżowce o szklanych fasadach, rzucające cień na całą okolicę. Jesteś zachwycony ich wykonaniem i zastanawiasz się, jak ludzie wznoszą takie budynki.",
        "neutral": "Wyobraź sobie, że siedzisz w kawiarni na starym rynku. Przez okno obserwujesz turystów fotografujących fontannę z posągiem Neptuna. Kelnerka w fartuchu w kratkę nalewa Ci herbatę do filiżanki z motywem kotów. Zapach świeżo mielonej kawy miesza się z dźwiękiem delikatnego jazzu, a Ty zastanawiasz się, czy wybrać sernik czy makowiec."
    },
    "ŻYCZENIE": {
        "critical": "Wyobraź sobie, że siedzisz przy stole wigilijnym. Na choince migocze gwiazdka, a pod nią leży prezent owinięty w złoty papier. Babcia cieszy się z magii świąt i z tego, że wszyscy przyjechali do niej. Podchodzicie do siebie i mówicie sobie miłe słowa na nowy rok. W kącie stoi talerz z ciasteczkami z wróżbą, które mają zdecydować o Twojej przyszłości, chociaż sam w to nie wierzysz. Wolisz dzielić się opłatkiem i mówić, czego pragniesz dla bliskich.",
        "non_critical": "Wyobraź sobie, że siedzisz przy stole wigilijnym. Na choince migocze gwiazdka, a pod nią leży prezent owinięty w złoty papier. Babcia cieszy się z magii świąt i z tego, że wszyscy przyjechali do niej. Podchodzi do ciebie i całuje cię w policzek. W kącie stoi talerz z ciasteczkami z wróżbą, które mają zdecydować o Twojej przyszłości, chociaż sam w to nie wierzysz. Otwierasz jedno i z uśmiechem je czytasz.",
        "neutral": "Wyobraź sobie, że stoisz na stacji benzynowej o północy. Na półce leżą przekąski i napoje, a kasjerka w niebieskim uniformie rozmawia przez telefon. W powietrzu unosi się zapach gumy i oleju. Kupujesz batonik i zastanawiasz się, czy zdążysz dojechać do domu. Masz nadzieję, że ktoś na ciebie poczeka, bo nie masz klucza od domu."
    },
    "GWIZDEK": {
        "critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Słyszysz wysoki dźwięk na zewnątrz i nie skupiasz się na lekcji. Za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym, wydając ostre dźwięki. Zapatrzony w okno słyszysz niechciany sygnał, i wiesz, że musisz zacząć biegać okrążenia.",
        "non_critical": "Wyobraź sobie, że jesteś na sali gimnastycznej podczas w-f. Trener krzyczy, byście ustawili się w rzędzie. Ty jednak nie skupiasz się na lekcji, bo za oknem dostrzegasz policjanta, który kieruje ruchem po wypadku samochodowym. Zapatrzony w okno słyszysz dźwięk trenera, który mówi, że musisz się skupić. To twój sygnał, żeby nie patrzeć więcej przez okno.",
        "neutral": "Wyobraź sobie, że przeglądasz stare zdjęcia w albumie na poddaszu babci. Kurz unosi się w promieniach słońca wpadających przez okno, a na półkach stoją pudełka z porcelanowymi figurkami. Na jednym ze zdjęć widzisz siebie jako dziecko, trzymającego pluszowego misia w kapeluszu. Pachnie tu lawendą i starą drewnianą podłogą. Zastanawiasz się, czy zabrać któreś zdjęcie do ramki."
    }
};

// Losowa kolejność list
const originalListOrder = ["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"];
const listOrder = jsPsych.randomization.shuffle([...originalListOrder]);

const groups = {
    "critical": ["critical", "critical", "critical", "critical"],
    "non_critical": ["non_critical", "non_critical", "non_critical", "non_critical"],
    "neutral": ["neutral", "neutral", "neutral", "neutral"]
};

const fullRecognitionList = [
    "stetoskop", "kitel", "fartuch", "słuchawki", "pediatra",
    "urodziny", "rozkaz", "kartka", "spełnienie", "prośba",
    "chłopak", "dąb", "poziom", "przystojny", "długi",
    "sędzia", "hałas", "koniec", "sport", "piłka",
    "lekarz", "życzenie", "wysoki", "gwizdek",
    "apteka", "most", "balon", "telewizor", "księżyc",
    "piasek", "motyl", "laptop", "rower", "zegar"
];

// Nowe zadania matematyczne
const mathTasks = [
    { question: "2 + 3 × 4 =", answer: 14 },
    { question: "5 × 2 - 1 =", answer: 9 },
    { question: "4 + 6 ÷ 2 =", answer: 7 },
    { question: "10 ÷ 2 × 3 =", answer: 15 },
    { question: "7 - 3 × 2 =", answer: 1 }
];

// Inicjalizacja jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        const dataArray = data.values();
        if (dataArray.length > 0) {
            const csvData = data.csv();
            saveDataToOSF(csvData);
        } else {
            console.log("Brak danych do zapisania.");
        }
    },
    use_webaudio: false
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        jsPsych.endExperiment('Eksperyment przerwany przez użytkownika.');
    }
});

// Funkcje pomocnicze
function assignToGroup() {
    const groupNames = Object.keys(groups);
    return groupNames[Math.floor(Math.random() * groupNames.length)];
}

async function saveDataToOSF(data) {
    const filename = `results_${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15)}.csv`;
    try {
        const response = await fetch('https://pipe.jspsych.org/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                experimentID: 'nIbjy3keQoaX',
                filename: filename,
                data: data
            })
        });
        if (!response.ok) throw new Error('Błąd zapisu: ' + response.statusText);
        return response.json();
    } catch (error) {
        console.error('Błąd:', error);
        alert('Problem z zapisem danych.');
    }
}

// Timeline eksperymentu
const timeline = [];
const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);
const group = assignToGroup();

// Ekran startowy
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test pamięciowy rozpocznie się za chwilę!</h2>
        <p>Za chwilę zobaczysz serię słów do zapamiętania.</p>
        <p>Kliknij przycisk, aby rozpocząć.</p>
    `,
    choices: ['Rozpocznij']
});

// Instrukcje i dane demograficzne
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witamy w badaniu</h2>
        <p>Wszystkie dane są anonimowe. Kliknij poniżej, aby kontynuować.</p>
    `,
    choices: ['Przejdź dalej']
});

timeline.push({
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Podaj płeć:", name: 'gender', required: true }
    ],
    data: { participant_id: participantId, group: group }
});

// Główna pętla eksperymentu
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    const wordList = wordLists[listName];

    // Wyświetlanie słów
    for (const word of wordList) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            data: { 
                participant_id: participantId, 
                group: group, 
                list_name: listName, 
                word: word 
            }
        });
    }

    // Narracje
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);

    for (let j = 0; j < sentences.length; j++) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Zdanie ${j + 1}:</p>
                <p>${sentences[j]}.</p>
                <p>Kliknij przycisk, aby kontynuować.</p>
            `,
            choices: ['Przejdź dalej'],
            data: { 
                participant_id: participantId, 
                sentence: sentences[j] 
            }
        });
    }

    if (i < listOrder.length - 1) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `<p>Krótka przerwa...</p>`,
            choices: ['Przejdź dalej']
        });
    }
}

// Zadania matematyczne
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p>Teraz rozwiąż zadania matematyczne:</p>`,
    choices: ['Rozpocznij']
});

for (const task of mathTasks) {
    timeline.push({
        type: jsPsychSurveyText,
        questions: [{ 
            prompt: task.question, 
            name: 'math_answer', 
            required: true, 
            input_type: 'number' 
        }],
        data: { 
            correct_answer: task.answer,
            question: task.question 
        }
    });
}

// Faza rozpoznawania
const shuffledRecognitionList = jsPsych.randomization.shuffle(fullRecognitionList);
for (const word of shuffledRecognitionList) {
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `<div class="recognition-word"><h1>${word}</h1></div>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo pojawiło się wcześniej?</p>',
        data: { 
            participant_id: participantId,
            word: word,
            is_target: fullRecognitionList.slice(0, 24).includes(word)
        }
    });

    timeline.push({
        type: jsPsychSurveyLikert,
        questions: [{
            prompt: `Pewność odpowiedzi dla "${word}":`,
            labels: ['1 (niska)', '2', '3', '4', '5 (wysoka)'],
            required: true
        }]
    });
}

// Zakończenie
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `<h2>Dziękujemy!</h2>`,
    choices: ['Zakończ']
});

// Uruchomienie
jsPsych.run(timeline);
