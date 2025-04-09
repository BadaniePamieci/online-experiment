// experiment.js - PEŁNY POPRAWIONY KOD

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
        "neutral": "Wyobraź sobie, że siedzisz w kawiarni na starym rynku. Przez okno obserwujesz turystów fotografujących fontannę z posągiem Neptuna. Kelnerka w fartuchu w kratkę nalewa Ci herbatę do filiżanki z motywem kotów. Zapach świeżo mielinej kawy miesza się z dźwiękiem delikatnego jazzu, a Ty zastanawiasz się, czy wybrać sernik czy makowiec."
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

const listOrder = ["LEKARZ", "ŻYCZENIE", "WYSOKI", "GWIZDEK"];
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

const mathTasks = [
    { question: "2 + 3 × 4 =", answer: 14 },
    { question: "5 × 2 - 1 =", answer: 9 },
    { question: "4 + 6 ÷ 2 =", answer: 7 },
    { question: "10 ÷ 2 × 3 =", answer: 15 },
    { question: "7 - 3 × 2 =", answer: 1 }
];

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
        if (!response.ok) {
            throw new Error('Błąd zapisu danych na OSF: ' + response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error('Wystąpił błąd podczas zapisywania danych:', error);
        alert('Wystąpił problem z zapisem danych. Skontaktuj się z badaczem.');
    }
}

// Inicjalizacja jsPsych z poprawionym zapisem danych
const jsPsych = initJsPsych({
    on_finish: function() {
        const data = jsPsych.data.get();
        const dataArray = data.values();
        
        if (dataArray.length > 0) {
            // Zapis pełnych danych jako JSON
            const jsonData = JSON.stringify(dataArray, null, 2);
            const jsonBlob = new Blob([jsonData], {type: 'application/json'});
            const jsonUrl = URL.createObjectURL(jsonBlob);
            const jsonLink = document.createElement('a');
            jsonLink.href = jsonUrl;
            jsonLink.download = `full_data_${participantId}.json`;
            document.body.appendChild(jsonLink);
            jsonLink.click();
            document.body.removeChild(jsonLink);
            
            // Zapis danych do analizy jako CSV
            const csvData = data.csv();
            const csvBlob = new Blob(["\uFEFF", csvData], {type: 'text/csv;charset=utf-8'});
            const csvUrl = URL.createObjectURL(csvBlob);
            const csvLink = document.createElement('a');
            csvLink.href = csvUrl;
            csvLink.download = `analysis_data_${participantId}.csv`;
            document.body.appendChild(csvLink);
            csvLink.click();
            document.body.removeChild(csvLink);
            
            // Oryginalny zapis na OSF
            saveDataToOSF(csvData);
        }
    },
    use_webaudio: false
});

// Globalny listener dla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        console.log("Naciśnięto ESC – kończę eksperyment.");
        jsPsych.endExperiment('Eksperyment zakończony przez użytkownika.');
    }
});

// Timeline eksperymentu
const timeline = [];

// Dane uczestnika
const participantId = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15);
const group = assignToGroup();

// Instrukcje początkowe
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Witamy w badaniu naukowym</h2>
        <p>Wszystkie dane są anonimowe i będą wykorzystywane wyłącznie do celów naukowych.</p>
        <p>Twoim zadaniem jest zapamiętanie jak najwięcej słów z każdej listy. Po każdej liście przeczytasz krótki tekst. Na koniec odbędzie się test rozpoznawania słów.</p>
        <p>Kliknij przycisk poniżej, aby kontynuować.</p>
        <p>(Naciśnij ESC, aby wyjść w dowolnym momencie)</p>
    `,
    choices: ['Przejdź dalej']
});

// Dane demograficzne
timeline.push({
    type: jsPsychSurveyText,
    questions: [
        { prompt: "Podaj swój wiek:", name: 'age', required: true, input_type: 'number' },
        { prompt: "Podaj swoją płeć (Kobieta, Mężczyzna, Inna, Wolę nie podawać):", name: 'gender', required: true }
    ],
    data: { participant_id: participantId, group: group }
});

// Ekran informacyjny przed listami
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test pamięciowy rozpocznie się za chwilę!</h2>
        <p>Przygotuj się na wyświetlanie kolejnych słów.</p>
        <p>Kliknij przycisk, aby rozpocząć.</p>
    `,
    choices: ['Rozpocznij']
});

// Listy słów i narracje
for (let i = 0; i < listOrder.length; i++) {
    const listName = listOrder[i];
    const wordList = wordLists[listName];

    // Wyświetlenie listy słów
    for (const word of wordList) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${word}</h1>`,
            choices: ['no_response'],
            trial_duration: 1000,
            response_ends_trial: false,
            post_trial_gap: 500,
            data: { 
                participant_id: participantId, 
                group: group, 
                list_name: listName, 
                trial_number: i + 1, 
                word: word 
            }
        });
    }

    // Narracja
    const narrationType = groups[group][i];
    const narrationText = narratives[listName][narrationType];
    const sentences = narrationText.split('.').map(s => s.trim()).filter(s => s);

    for (let j = 0; j < sentences.length; j++) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>${sentences[j]}.</p>
                <p>Kliknij przycisk, aby przejść dalej.</p>
            `,
            choices: ['Dalej'],
            data: { 
                participant_id: participantId, 
                group: group, 
                list_name: listName, 
                sentence_number: j + 1, 
                sentence: sentences[j] 
            }
        });
    }

    // Przerwa między listami
    if (i < listOrder.length - 1) {
        timeline.push({
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <p>Krótka przerwa...</p>
                <p>Przygotuj się na następną listę słów.</p>
            `,
            choices: ['Kontynuuj'],
            data: { phase: 'break' }
        });
    }
}

// Zadania matematyczne
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Zadania matematyczne</h2>
        <p>Rozwiąż następujące równania:</p>
    `,
    choices: ['Rozpocznij']
});

for (let i = 0; i < mathTasks.length; i++) {
    timeline.push({
        type: jsPsychSurveyText,
        questions: [
            { prompt: `${mathTasks[i].question}`, name: `math_${i}`, required: true, input_type: 'number' }
        ],
        data: { 
            participant_id: participantId, 
            group: group, 
            math_question: mathTasks[i].question, 
            correct_answer: mathTasks[i].answer 
        }
    });
}

// Faza rozpoznawania
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Test rozpoznawania słów</h2>
        <p>Określ, czy każde słowo pojawiło się wcześniej.</p>
        <p>Po każdej odpowiedzi ocenisz swoją pewność.</p>
    `,
    choices: ['Rozumiem']
});

const shuffledRecognitionList = jsPsych.randomization.shuffle(fullRecognitionList);
for (const word of shuffledRecognitionList) {
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `<div class="recognition-word"><h1>${word}</h1></div>`,
        choices: ['Tak', 'Nie'],
        prompt: '<p>Czy to słowo pojawiło się wcześniej?</p>',
        data: { 
            participant_id: participantId, 
            group: group, 
            word: word,
            is_target: wordLists[listOrder[0]].includes(word) || 
                      wordLists[listOrder[1]].includes(word) || 
                      wordLists[listOrder[2]].includes(word) || 
                      wordLists[listOrder[3]].includes(word) ||
                      ['lekarz', 'życzenie', 'wysoki', 'gwizdek'].includes(word)
        }
    });

    timeline.push({
        type: jsPsychSurveyLikert,
        questions: [
            { 
                prompt: `Pewność odpowiedzi (1-5):`, 
                labels: ['1', '2', '3', '4', '5'], 
                required: true, 
                name: `confidence_${word}` 
            }
        ],
        data: { participant_id: participantId, group: group, word: word }
    });
}

// Zakończenie
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <h2>Dziękujemy za udział w badaniu!</h2>
        <p>Twoje dane zostały zapisane.</p>
    `,
    choices: ['Zakończ']
});

// Uruchomienie eksperymentu
jsPsych.run(timeline);
