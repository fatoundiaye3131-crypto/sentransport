import { useState } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';

function App() {
  // ÉTATS
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [compteurRecherches, setCompteurRecherches] = useState(0); // Exercice 3

  // DONNÉES
  const lignes = [
    { 
      id: 1, 
      numero: "1", 
      depart: "Parcelles Assainies", 
      arrivee: "Plateau", 
      arrets: 14, 
      listeArrets: ["Parcelles U14", "Parcelles U10", "Camberene", "Patte d'Oie", "Grand Dakar", "Colobane", "Ponty", "Plateau"] 
    },
    { 
      id: 2, 
      numero: "7", 
      depart: "Guediawaye", 
      arrivee: "Place Obe", 
      arrets: 18, 
      listeArrets: ["Guediawaye", "Pikine", "Thiaroye", "Keur Massar", "Grand Yoff", "Parcelles", "Liberte 6", "Place Obe"] 
    },
    { 
      id: 3, 
      numero: "15", 
      depart: "Pikine", 
      arrivee: "Medina", 
      arrets: 12, 
      listeArrets: ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"] 
    },
    { 
      id: 4, 
      numero: "23", 
      depart: "Ouakam", 
      arrivee: "Grand Dakar", 
      arrets: 10, 
      listeArrets: ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"] 
    },
    { 
      id: 5, 
      numero: "8", 
      depart: "Almadies", 
      arrivee: "Colobane", 
      arrets: 16, 
      listeArrets: ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"] 
    },
    { 
      id: 6, 
      numero: "12", 
      depart: "Yoff", 
      arrivee: "Sandaga", 
      arrets: 11, 
      listeArrets: ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"] 
    }
  ];

  // FILTRAGE
  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  // FONCTIONS
  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
  }

  // Exercice 3 : Fonction pour le compteur
  function handleRechercheChange(nouvelleValeur) {
    if (nouvelleValeur !== recherche && nouvelleValeur !== "") {
      setCompteurRecherches(compteurRecherches + 1);
    }
    setRecherche(nouvelleValeur);
  }

  // RENDU JSX
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        
        {/* Exercice 3 : Compteur de recherches */}
        <div className="compteur-recherches">
          🔍 Vous avez effectué <strong>{compteurRecherches}</strong> recherche{compteurRecherches > 1 ? 's' : ''}
        </div>

        {/* Exercice 1 : Bouton Effacer */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Recherche valeur={recherche} onChange={handleRechercheChange} />
          <button onClick={() => setRecherche("")} className="btn-effacer">
            Effacer
          </button>
        </div>

        {/* Nombre de résultats */}
        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
        </p>

        {/* Exercice 2 : Message si aucun résultat */}
        {lignesFiltrees.length === 0 && (
          <div className="aucun-resultat">
            <p>😔 Aucune ligne trouvée pour "{recherche}"</p>
            <p className="suggestion">Essayez "Pikine", "Dakar" ou un numéro de ligne</p>
          </div>
        )}

        {/* Liste des lignes filtrées */}
        {lignesFiltrees.map(ligne => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}

        {/* Détail de la ligne sélectionnée */}
        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
        
      </main>
      <Footer />
    </div>
  );
}

export default App;