


(function(){

  "use strict";


  angular.module("appWalkingDead", []) // permet d'initialiser une app côté JS
       .controller("peopleCtrl", function($scope, $http) {    // 1er argument = nom du controleur (html), 2ème = la fonction qu'on va chargée (en l'occurance jison ici)

       $http.get("datas/people.json")
        .then(function(res) {
              $scope.people = res.data;
              $scope.idNumber = $scope.people.length+1;  // besoin de mettre ceci ici (dans le get) afin qu'il calcule avant la longueur du tableau, car sinon la console nous dit qu'il est undefined
            });


        $scope.supprimerPerson = function(person) {
              console.log("utilisateur supprimé!");
                var index = $scope.people.indexOf(person);
                $scope.people.splice(index, 1);
              }




        $scope.ajoutPerson = function() {
          console.log("Personnage ajouté!");
          $scope.people.push ({
            id:$scope.idNumber,
            pseudo: $scope.pseudo,
            sexe: $scope.sexe,
            photo: $scope.photoUrl,
            activite: $scope.activite,
            datenassance: $scope.datenaissance,
            // sport: $scope.sports
          })

          //pour vider les champs une fois le submit réalisé
          // $scope.nom = "";
          // $scope.prenom = "";
          // $scope.age = "";
          // $scope.ville = "";
          // $scope.sexe = "";
          // $scope.sports = "[]";

      }

      //Vérification Url photo
      $scope.isUrlInValid = false;

      $scope.verifieUrl = function() {
        var regex = /[a-z\à\é\è\ê\s\-\_\/\.\:\d]+\.(?:jpg|jpeg|gif|png)/ig;
        if(!regex.test($scope.photoUrl)){
          $scope.isUrlInvalid = true;
          console.log("true");
        }
        else{
          $scope.isUrlInvalid = false;
          console.log("false");
        }

     }









          })

  }())
