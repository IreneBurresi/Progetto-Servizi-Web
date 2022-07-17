  
# Progetto finale esame SSW

  

## Specifiche

Il progetto consiste nella realizzazione di un'applicazione per la prenotazione di posti a teatro.

  

Dall'interfaccia web sul browser le funzionalità disponibili devono essere:


* Accesso alle prenotazioni per uno spettacolo specifico

* Impostazione del nominativo dell'utente

* Visualizzazione grafica della disposizione e disponibilità dei posti

* Messaggio di conferma di avvenuta prenotazione

  

### Funzionalità opzionali

Opzione 1: *Teatro configurabile*

  

La schermata di accesso, oltre a consentire di accedere ad un teatro

precostituito, consente anche di creare un nuovo teatro, configurandone i posti, sempre considerando solo due ordini di posti. Il segreto da utilizzare nella new è ssw2022.

  

Opzione 2: *Prenotazione veloce*


La funzione di prenotazione viene associata al tasto corrispondente al posto.

## Requisiti per l'implementazione

Il progetto è realizzato in Angular 13+ utilizzando
la IDE online Stackblitz.

  

Le prenotazioni per un certo spettacolo sono rappresentate con array di stringhe, una cella per posto, contenenti il nominativo dell'utente prenotato, quando presente.

Ciascun ordine di posti è rappresentato con un diverso array, cioè, un array per la platea ed uno per i palchi.

Le prenotazioni per un certo spettacolo sono conservate in un database esterno come una stringa JSON rappresentante gli array detti sopra. Il database è di tipo key-value: i posti impegnati per un certo spettacolo sono associati ad una chiave randomizzata. Per accedere alla funzione di prenotazione è necessario conoscere la chiave associata allo spettacolo.

  

## Descrizione delle principali scelte progettuali

Il progetto è suddiviso in 9 componenti più 1 servizio.

  

### Servizio ```TheaterMemorizationService```

  

Il servizo TheaterMemorizationService mette a disposizione

i metodi per comunicare con il database KVaas.

  

Permette, data la chiave di

* **memorizzare una stringa JSON** come valore corrispondente alla chiave

* **estrarre** dal database **la stringa JSON** corrispondente alla chiave

* **generare una nuova chiave**

  

### Componente ```GetShowIdComponent```
È il componente che permette di **inserire il codice dello spettacolo** a cui si desidera accedere.


| Funzionalità implementate  | HTML | Funzioni |
| -------------                    | -------------              | --------------                    |
| Inserimento codice spettacolo    | `input-text` + [`button`]| `setSelectedShowId(value)` |
| Selezione di un nuovo spettacolo | `button` | `resetShowId()`  |




L'inserimento è possibile attraverno un **input-box** nell'**HTML**, che accetta una **stringa di 8 caratteri** (identificante la chiave a cui sono associate le prenotazioni dello spettacolo nel database).

La stringa inserita viene poi **validata** all'interno del componente (viene eseguito un accesso al database per stabilire se il codice inserito corrisponde ad un teatro esistente o meno).

| Input | Output |
|--------| ----------|
| - | ```@Output() newShow = new EventEmitter<ShowBookings>();```<br>```@Output() newShowId = new EventEmitter<string>();``` |

Se il codice inserito è corretto, vengono restituiti in **output** al componente padre il **codice dello spettacolo** (stringa di 8 caratteri da usare come chiave nel database) e le **prenotazioni** (oggetto della classe ```ShowBookings```) ottenute dal database.

Dopo che un codice inserito è stato validato e restituito come output al padre, si attiva un **bottone** che permette di **cambiare** lo s**pettacolo selezionato**. 

  

### Componente ```GetBookerNameComponent```

È il componente che permette di **inserire il nominativo** dell'utente che desidera prenotare un biglietto.

L'inserimento del nominativo è possibile attraverso un **input box HTML** che accetta una stringa di almeno 3 caratteri.

Una volta che è stato inserito il nominativo si attiva un **bottone** che permette di **cambiare nominativo**.

| Funzionalità implementate  | HTML | Funzioni |
| -------------                    | -------------              | --------------                    |
| Inserimento del nominativo    | ```input-text``` + [```button```]| ```setBookerName(value)``` |
| Cambio nominativo | ```button``` | ```resetBookerName()```  |


Il nominativo inserito viene restituito in **output** al componente padre.

| Input | Output |
|--------| ----------|
| ```@Input() booker_name : string;``` | ```@Output() newBookerName = new EventEmitter<string>();```|

  

### Componente ```DisplayShowBookingsComponent```

È il componente che, ricevuto in **input** le **prenotazioni** (oggetto della classe ShowBookings) di un certo spettacolo, attraverso due **ngFor** annidati, inserisce nell'HTML dei **bottoni selezionabili** rappresentanti i posti.


  | Funzionalità implementate  | HTML | Funzioni |
| -------------                    | -------------              | --------------                    |
| Selezione del posto    | ```button```| ```selectSeat()``` |
| Display dei posti | due ```ngFor``` annidati |

Al **click** su un posto (possibile solo se il posto è libero, i bottoni dei posti occupati sono disabilitati), viene attivata una **funzione** che restituisce in **output** al componente padre il **posto** che è stato selezionato (oggetto del tipo  ```selected_seat: { row_n: number; seat_n: number; seat_type: string }```).

| Input | Output |
|--------| ----------|
| ```@Input() show_bookings: ShowBookings;``` | ```@Output() newSelectedSeat = new EventEmitter<any>();```|

### Componente ```NewShowIdComponent```

È il componente che permette di **ottenere dal database una nuova chiave**. La richiesta può essere effettuata cliccando su un bottone HTML.

  | Funzionalità implementate  | HTML | Funzioni |
| -------------                    | -------------              | --------------                    |
| Generazione di una nuova chiave   | ```button```| ```getNewKeyFromDatabase()``` |
| Associazione di un teatro vuoto di dimensioni standard alla chiave | automatico |

Non appena viene ricevuta la nuova chiave dal database, viene creato un **nuovo spettacolo di dimensioni standard**, vuoto, e memorizzato nel database come valore associato alla nuova chiave.

Quest'operazione è necessaria affinché i successivi accessi al valore associato alla nuova chiave nel database restituiscano una stringa JSON su cui sia possibile eseguire il parsing (a ```ShowBookings```) e quindi riconoscere quella cella come cella contenente uno spettacolo.

| Input | Output |
|--------| ----------|
| - | ```@Output() newShowId = new EventEmitter<string>();```|

La dimensione dello spettacolo è comunque subito personalizzabile (funzionalità teatro configurabile) attraverso il componente NewShow.
  

### Componente ```NewShowComponent```

È il componente implementa la funzionalià opzionale *teatro configurabile* che permette di **configurare le dimensioni di uno spettacolo**. È possibile impostare le dimensioni sia dei nuovi spettacoli appena creati, sia dei degli spettacoli già creati precedentemente (questa funzionalità si è rivelata necessaria per evitare la creazione di un numero eccessivo di nuove chiavi: è quindi possibile resettare  gli spettacoli già esistenti).

  | Funzionalità implementate  | HTML | Funzioni |
| -------------                    | -------------              | --------------                    |
| Impostazione dimensioni teatro   | 4 ```input-text``` + [```button```]| ```resetShow(values)``` |
| Reset delle prenotazioni associate allo spettacolo | automatico |


Il componente prende in **input** il **codice identificativo dello spettacolo**. Nell'HTML sono presenti **quattro input box** in cui è possibile inserire dei numeri (con limitazioni di grandezza, per evitare la creazione di teatri di dimensioni eccessive, che supererebbero i 2 KBytes memorizzabili in una cella del database), indicanti le quattro dimensioni che caratterizzano ciascuna spettacolo (numero di file della platea, numero di posti per fila, numero di palchi, numero di posti per palco).

I valori di partenza sono impostati automaticamente sulle dimensioni di default. 

Il componente **crea un nuovo spettacolo delle dimensioni inserite** e lo **memorizza all'interno del database** nella cella corrispondente alla chiave rappresentata dal codice spettacolo. Restituisce poi in **output** un booleano, che serve ad **indicare al componente padre di aggiornare le prenotazioni dello spettacolo selezionato** (perché saranno state resettate e le dimensioni potrebbero essere state modificate).

| Input | Output |
|--------| ----------|
| ```@Input() show_id : string;```| ```@Output() newDimensions = new EventEmitter<boolean>();```|


### Componente ```UserAreaComponent```

È il componente che implementa la funzionalià di **prenotazione veloce**. 
Ha come figli diversi componenti descritti precedentemente ( ```GetShowIdComponent```, ```GetBookerNameComponent```, ```DisplayShowBookingsComponent```), di cui gestisce gli output per ottenere i dati per la prenotazione veloce.

| Componenti figli | Input | Output |
|---------------------- | -----------------| --------|
| ```GetShowId``` | - | ```(newShow) = "setShow($event)"(newShowId) = "setShowId($event)"```|
| ```GetBookerName```| ```[booker_name] = "getBookerName()"```| ```(newBookerName) = "setBookerName($event)"```|
| ```DisplayShowBookings```|```[show_bookings] = "getShowBookings()"``` | ```(newSelectedSeat) = "setSelectedSeat($event)"``` |
Permette di visualizzare i componenti per l'inserimento del nominativo e per la selezione del posto solo dopo che è stato inserito un codice spettacolo valido.

Permette di effettuare una **prenotazione rapida** soltanto dopo aver selezionato il posto (attraverso il componente ```DisplayShowBookings```) e inserito un nominativo (attraverso il componente ```GetBookerName```).

Dopo la selzione del nominativo e del posto, viene visualizzata una richiesta di conferma di prenotazione per il posto selezinato. Alla conferma il posto selezionato viene prenotato al nominativo impostato, caricando nel database le nuove prenotazioni (```ShowBookings```), e ri-estraendole per aggionare il diplay. A questo punto viene resettato il nominativo (poiché si tratta di una prenotazione veloce).

  
### Componente ```AdminAreaComponent```
È il componente che implementa le funzionalià di **biglietteria** e **configurazione delle dimensioni**. La password per accedere alle funzionalità è 'admin'.

| Componenti figli | Input | Output |
|---------------------- | -----------------| --------|
| ```GetShowId``` | - | ```(newShow) = "setShow($event)"(newShowId) = "setShowId($event)"```|
| ```GetBookerName```| -| ```(newBookerName) = "setBookerName($event)"```|
| ```DisplayShowBookings```|```[show_bookings] = "getShowBookings()"``` | ```(newSelectedSeat) = "setSelectedSeat($event)"``` |
| ```NewShowId```| - | ```(newShowId) = "setShowId($event)"```|
| ```NewShow``` | ```[show_id] = "getShowId()"``` | ```(newDimensions) = "newDimensions($event)"``` |

Permette di eseguire la funzione di biglietteria e la reimpostazione delle dimensioni e delle prenotazioni) di un certo spettacolo solo dopo aver inserito un codice spettacolo valido o aver creato un nuovo spettacolo.

### Giustificazioni alla scelta di suddivisione dei componenti

La spinta di una scelta di suddividere le componenti come sopra descritto è stata guidata dal principio di riusabilità del codice: componenti come ```GetShowId```,  ```GetBookerName``` e ```DisplayShowBookings``` vengono riutilizzati sia nell'area utenti che nell'aria amministratori, permettendo così di non dover riscrivere una sostanziale parte del codice.

La scelta di utilizzare due componenti principali  (```UserArea``` e ```AdminArea```) per implementare le differenti funzionalità (prenotazione veloce da una parte e bilglietteria e configurazione delle dimensioni dall'altra) è stata guidata da due idee:
* In una applicazione reale solitamente un utente semplice non ha i privilegi per modificare radicalmente i database e le strutture dati (motivo che spinge a separare le prenotazioni veloci dalla configurazione del teatro)
* La differenza fra la prenotazione veloce (implementata dalla ```UserArea``` ) e la funzionalità di biglietteria (implementata dalla ```AdminArea```) non non risiede né della selezione dello spettacolo (implementabile con ```GetShowId```), né nella selezione del nominativo (```GetBookerName```), né nella selzione del posto (```DisplayShowBookings```), ma solo nella gestione degli output  dei componenti figli che implementano queste funzionalità.  Motivo che spinge a separare le componenti della prenotazione veloce e della biglietteria, riutilizzando gli altri componenti come child.


### Gestione della concorrenza e del controllo del posto libero
La concorrenza fra più prenotazioni è gestita in modo naive:
1)  Appena viene inserito un codice spettacolo valido, viene estratta dal database e parsata la stringa contenente le prenotazioni; i posti vengono mostrati di conseguenza attraverso ```DisplayShowBookings```
2)  Quando viene prenotato un posto (attraverso la funzione ```BookSeat()```):
	1) viene prima riestratta la stringa delle prenotazioni dal database e parsata,
	2) viene controllato che il posto sia sempre libero (qualcuno potrebbe aver estratto la stringa dal database dopo di noi e aver eseguito delle prenotazioni più velocemente rispettoa noi);
		* se il posto risulta occupato viene mostrato un messaggio che indica l'impossibilità di prenotare il posto
		* se il posto risulta libero, si modifica la stringa contenente le nuove prenotazioni estratte (in modo da non sovrascrivere prenotazini altrui) aggiungendo la prenotazione e poi si invia al database la nuova stringa.
			*  si riaccede al databse per ottenere le nuove prenotazioni 

Questa gestione naive della concorrenza permette di gestire, almeno parzialmente, l'accesso concorrente al database, ma è sempre possibile che un utente A scarichi di dati del database (per prenotare) e un altro utente B carichi la propria prenotazione quando ancora l'utente A sta effettuando il confronto per stabilire se un posto è libero. In questo caso la prenotazione dell'utente B viene sovrascritta da quella dell'utente A.