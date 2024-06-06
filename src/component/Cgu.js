import React from "react";

const Cgu = () => {
    return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Conditions Générales d'Utilisation
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Préambule</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après
              dénommées "CGU") définissent les conditions d'utilisation des
              services proposés sur le site web [Nom du Site] (ci-après dénommé
              "le Site"). En accédant et en utilisant le Site, vous acceptez
              sans réserve les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              1. Informations Légales
            </h2>
            <p>
              Le Site est édité par [Nom de l'Éditeur], [Statut juridique], au
              capital de [Montant en euros] €, immatriculée au Registre du
              Commerce et des Sociétés de [Ville], sous le numéro [Numéro RCS],
              dont le siège social est situé [Adresse complète].
            </p>
            <p>
              Directeur de la publication : [Nom du directeur de la publication]
              <br />
              Hébergeur : [Nom de l'hébergeur], [Adresse complète de
              l'hébergeur].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Accès au Site</h2>
            <p>
              L'accès au Site est gratuit. Les frais d'accès et d'utilisation du
              réseau de télécommunication sont à la charge de l'utilisateur,
              selon les modalités fixées par ses fournisseurs d'accès et
              opérateurs de télécommunication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. Inscription et Compte Utilisateur
            </h2>
            <p>
              Pour accéder à certains services, l'utilisateur doit créer un
              compte en fournissant des informations exactes, complètes et à
              jour. L'utilisateur est responsable de la confidentialité de son
              identifiant et de son mot de passe, ainsi que de toutes les
              activités réalisées sous son compte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              4. Utilisation des Services
            </h2>
            <p>
              L'utilisateur s'engage à utiliser le Site conformément aux
              présentes CGU et aux lois en vigueur. Il est strictement interdit
              de :
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Publier du contenu diffamatoire, injurieux, obscène, illégal ou
                en violation des droits d'autrui.
              </li>
              <li>
                Utiliser le Site à des fins de spamming, d'hameçonnage, ou toute
                autre activité frauduleuse.
              </li>
              <li>
                Perturber le fonctionnement du Site, notamment par l'utilisation
                de virus, de logiciels malveillants ou toute autre technique de
                piratage.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              5. Propriété Intellectuelle
            </h2>
            <p>
              Tous les contenus présents sur le Site, incluant, sans s'y
              limiter, les textes, images, graphismes, logos, icônes, sons,
              vidéos, logiciels, sont la propriété de [Nom de l'Éditeur] ou de
              ses partenaires et sont protégés par les lois relatives à la
              propriété intellectuelle. Toute reproduction, représentation,
              modification, publication, transmission, dénaturation, totale ou
              partielle du Site ou de son contenu, par quelque procédé que ce
              soit, et sur quelque support que ce soit, est interdite sans
              l'autorisation préalable et écrite de [Nom de l'Éditeur].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              6. Protection des Données Personnelles
            </h2>
            <p>
              [Nom de l'Éditeur] s'engage à respecter la vie privée des
              utilisateurs et à protéger les informations personnelles
              collectées conformément à la législation en vigueur. Pour plus
              d'informations, veuillez consulter notre Politique de
              Confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Responsabilité</h2>
            <p>
              [Nom de l'Éditeur] s'efforce d'assurer l'exactitude et la mise à
              jour des informations diffusées sur le Site. Toutefois, [Nom de
              l'Éditeur] ne peut garantir l'exactitude, la précision ou
              l'exhaustivité des informations mises à disposition sur le Site.
              En conséquence, [Nom de l'Éditeur] décline toute responsabilité
              pour tout dommage résultant de l'utilisation du Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              8. Modifications des CGU
            </h2>
            <p>
              [Nom de l'Éditeur] se réserve le droit de modifier, à tout moment,
              les présentes CGU. Les utilisateurs seront informés de ces
              modifications par tout moyen approprié. En continuant à utiliser
              le Site après la notification de modification des CGU,
              l'utilisateur accepte les nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              9. Droit Applicable et Juridiction
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige
              relatif à leur interprétation et/ou à leur exécution relève des
              tribunaux français compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">10. Contact</h2>
            <p>
              Pour toute question concernant les présentes CGU, vous pouvez
              contacter [Nom de l'Éditeur] à l'adresse suivante : [Adresse
              e-mail de contact].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cgu;