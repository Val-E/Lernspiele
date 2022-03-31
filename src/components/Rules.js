import { Alert } from 'react-bootstrap';


export const Rules = () => {
  return (
    <Alert variant="warning">
      <h4 className="h4">
        Regeln für Quiz:
      </h4>
      <p style={{maxWidth: 750}}>
        Jeder Spieler wählt eine Frage aus.
        Als Hilfe kann er sich dabei an der Kategorie orientieren,
        welche zuvor für jede Frage festgelegt wurden.
        Die Frage selbst sieht der Spieler nicht.
        Hat er eine Frage ausgewählt, muss er diese beantworten,
        indem er seine Antwort in das Eingabefeld eintippt und seine Antwort abschickt.
        Antwortet der Spieler richtig, bekommt dieser einen Punkt.
        Antworten er falsch, wird ihm ein Punkt abgezogen
        bzw. er bekommt einen negativen Punkt, sollte er noch keine Punkte haben.
        Wenn keine Fragen mehr vorhanden sind, ist die Runde vorbei, gewonnen hat,
        derjenige Spieler, welcher die meisten Punkte sammeln konnte.
      </p>

      <hr />

      <h4 className="h4">
        Regeln für Pairs:
      </h4>
      <p style={{maxWidth: 750}}>
        Am Anfang pickt der beginnende Spieler eine Frage heraus und versucht danach die passende Antwort herauszupicken.
        Findet der Spieler die passende Antwort wird das Kärtchen entfernt,
        dem Spieler wird ein Punkt gut geschrieben und dieser Spieler darf eine weitere Frage auswählen.
        Jenes geht so lange, bis der Spieler eine falsche Antwort pickt.
        Dann ist nämlich der nächste Spieler dran.
        Wenn keine Fragen mehr vorhanden sind, ist die Runde vorbei, gewonnen hat,
        derjenige Spieler, welcher die meisten Punkte sammeln konnte.
      </p>

      <hr />

      <h4 className="h4">
        Regeln für Vier Geinnt:
      </h4>
      <p style={{maxWidth: 750}}>
        Zwei Spieler werfen abwechselnd Spielsteine der eigenen Farbe
        – Rot beginnt, Gelb ist darauf dran – in ein Spielbrett. Der Stein nimmt,
        dabei den untersten freien Platz in der Spalte, in welche dieser geworfen wurde.
        Jedoch muss der Spieler, um einen Stein zu werfen,
        zuvor eine Frage richtig beantworten.
        Eine solche Frage wird angezeigt, sobald der Spieler die Spalte ausgewählt hat,
        in welche der Stein geworfen werden soll. Beantwortet der Spieler die Frage richtig,
        wird der Stein ins Spielbrett geworfen, anderenfalls nicht und der andere Spieler ist dran.
        Das Ziel besteht darin, vier Steine der eigenen Farbe in einer waagerechten,
        senkrechten oder diagonalen Reihe anzuordnen, um so das Spiel zu gewinnen.
        Wenn keine Plätze für Steine mehr frei sind
        und keiner gewonnen hat, handelt es sich um ein Unentschieden.
      </p>

      <hr />

      <h4 className="h4">
        Allgemeines:
      </h4>
      <p style={{maxWidth: 750}}>
        Da die Spieler, welche das Spiel eröffnen, denjenigen, welche nachziehen,
        gegenüber im Vorteil sind, gewinnt bei Gleichstand,
        bei den Spielen Quiz und Pairs, der letzte Spieler
        mit der höchsten in der Runde erreichten Punktezahl.
      </p>
    </Alert>
  );
}
