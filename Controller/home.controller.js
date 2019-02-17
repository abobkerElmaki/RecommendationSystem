(function () {
    'use strict';
    angular
        .module('HomeController', ['firebase'])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$scope', '$firebaseArray', '$firebase'];
    function HomeController(UserService, $rootScope, $scope, $firebaseArray, $firebase) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        var user2="";
        initController();

        function initController() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        vm.user = user;
                       user2 = user.username;

                      
                    });
            loadAllUsers();
            var db = firebase.firestore();
          
            $scope.Recommendation = [

            ]

          
            db.collection("recommendation").where("user", "==", "" + $rootScope.globals.currentUser.username)
 .get()
 .then(function (querySnapshot) {
     $scope.CheckFood = false;
     $scope.CheckArchitecture = false;
     $scope.CheckArt = false;
     $scope.CheckNature = false;
     $scope.CheckFoodM = false;
     $scope.CheckArchitectureM = false;
     $scope.CheckArtM = false;
     $scope.CheckNatureM = false;
     $scope.CheckEventM = false;
     querySnapshot.forEach(function (doc) {
         // doc.data() is never undefined for query doc snapshots

         $scope.Recommendation2 =
  {
      image_url: doc.data().image_url,
      name: doc.data().name,
      field: doc.data().field,
      user: doc.data().user

  }
       
         
         if (vm.user.city == 1) {
           // alert("DSDS");
             if (doc.data().field == 'food') {
                 $scope.CheckFood = true;
             }
             if (doc.data().field == 'Archtiecture') {
                 $scope.CheckArchitecture = true;
             }
             if (doc.data().field == 'Art') {
                 $scope.CheckArt = true;
             }
             if (doc.data().field == 'Nature') {
                 $scope.CheckNature = true;
             }
         }
         if (vm.user.city == 2) {
             // alert("DSDS");
             if (doc.data().field == 'food') {
                 $scope.CheckFoodM = true;
             }
             if (doc.data().field == 'Archtiecture') {
                 $scope.CheckArchitectureM = true;
             }
             if (doc.data().field == 'Art') {
                 $scope.CheckArtM = true;
             }
             if (doc.data().field == 'Nature') {
                 $scope.CheckNatureM = true;
             }
             if (doc.data().field == 'Event') {
                 $scope.CheckEventM = true;
             }
         }
         $scope.Recommendation.push($scope.Recommendation2);
         $scope.$apply();

     });
     
 })
 .catch(function (error) {
     console.log("Error getting documents: ", error);
 });

            // console.log();
        }

        $scope.onloadFun = function () {
          
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    user2 = user.username;
           
                    //alert(user2);
                });
        }
    
        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        $scope.setInterstingByUser = function (name, field, image, username) {
            //console.log(name + "username" + username);
         
           // $scope.Recommendation.push($scope.Recommend);
            var user = 'user';
         //   var ref = firebase.database().ref().child('recommendation');
           // var meals = $firebaseArray(ref.child('recommendation'));
        //    var recomendationByUser = $firebaseArray(ref)
            //var query = ref.orderByChild('users').equalTo('-LNFrlzAIH19pDAjImWN');
            //var syncArray = $firebaseArray(query);

            //console.log(syncArray);
          
            var data = [];
            var db = firebase.firestore();
         
           
           // $scope.Recommendation = JSON.stringify(data);
         //   console.log($scope.Recommendation2);
           // console.log($scope.women);
           // $scope.recommendation = $firebaseArray(ref);
         //   console.log($firebaseArray(firebaseDataService.requests));
           // localStorage.setItem("Recommendation", $scope.Recommendation);
            //$scope.newRecommendation = localStorage.getItem("Recommendation");
            console.log($scope.newRecommendation);
           
            db.collection("recommendation").add({

                image_url: image,
                name: name,
                field: field,
                user: username

            }
           

        ).then(function (docRef) {
           // console.log($scope.recommendation);
            console.log("Document written with ID: ", docRef.id);
            initController();
        });
            var user='user';
            
            //$scope.recommendation.$ref().once('value', function (snap) {
            //    angular.forEach(snap.val(), function (index) {
            //        console.log(snap)
            //    }
            //    )
            //}

       }
        $scope.FoodMadni = [
      {
          image_url: 'img/wdmdniResturant.jpg',
          name: 'ســــافوري',
          field: 'HOLYDAY',
          job: 'wdmadni',
          city: '2'
      },
            {
                image_url: 'img/wdmdniResturant2.jpg',
                name: 'كازون( دار الصيادلة',
                field: 'Resturant',
                job: 'wdmadni',
                city: '2'
            },
      {
          image_url: 'img/wdmdniResturant3.jpg',
          name: 'ريم',
          field: 'Resturant',
          job: 'wdmadni',
          city: '2'
      },
         {
             image_url: 'img/wdmdniResturant4.jpg',
             name: 'اليمن السعيد',
             field: 'Resturant',
             job: 'wdmadni',
             city: '2'
         },
        ]


        $scope.ArchMadni = [
  {
      image_url: 'img/wdmdniResturant6.jpg',
      name: 'قبة ودمدني السني',
      field: 'HOLYDAY',
      job: 'Archtiecture',
      city: '2'
  },
        {
            image_url: 'img/wdmdniResturant7.jpg',
            name: 'حنتوب الجميلة( مدرسة حنتوب سابقاً ) ',
            field: 'Archtiecture',
            job: 'wdmadni',
            city: '2'
        },
  {
      image_url: 'img/wdmdniResturant8.jpg',
      name: 'معهد اسلام المعرفة',
      field: 'Archtiecture',
      job: 'wdmadni',
      city: '2'
  },
    
        ]

        $scope.ArtMdani = [
{
    image_url: 'img/wdmdniResturant9.jpg',
    name: 'مسرح الجزيرة',
    field: 'Art',
    job: 'wdmadni',
    city: '2'
},
   {
       image_url: 'img/wdmdniResturant10.jpg',
       name: 'قصر الثقافة ودمدني ',
       field: 'Art',
       job: 'wdmadni',
       city: '2'
   },


        ]



        $scope.EventMdani = [
{
    image_url: 'img/wdmdniResturant11.jpg',
    name: 'معرض الزهور ودمدني',
    field: 'Event',
    job: 'wdmadni',
    city: '2'
},
{
    image_url: 'img/wdmdniResturant13.jpg',
    name: 'مهرجان الجزيرة للسياحة والتسوق ',
    field: 'Event',
    job: 'wdmadni',
    city: '2'
},





        ]



        $scope.NatureMdani = [
{
    image_url: 'img/wdmdniResturant12.jpg',
    name: 'شارع النيل',
    field: 'Nature',
    job: 'wdmadni',
    city: '2'
},
]


        $scope.FoodKH = [
     {
         image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Barcelona_Restaurant%2C_Khartoum_-_%D9%85%D8%B7%D8%B9%D9%85_%D8%A8%D8%B1%D8%B4%D9%84%D9%88%D9%86%D8%A9%2C_%D8%A7%D9%84%D8%AE%D8%B1%D8%B7%D9%88%D9%85.JPG',
         name: 'مطعم برشلونة ',
         field: 'food',
         job: 'khartoum',
         city: '1'
     },
        
        ]

        $scope.ArchitectureKH= [
 {
     image_url: 'img/KHArch.jpg',
     name: 'متحف السودان القومي ',
     field: 'Archtiecture',
     job: 'khartoum',
     city: '1'
 },
 {
     image_url: 'img/KHArch1.jpg',
     name: 'بوابة عبد القيوم ',
     field: 'Archtiecture',
     job: 'khartoum',
     city: '1'
 },
  {
      image_url: 'img/KHArch2.jpg',
      name: 'الطابية ',
      field: 'Architecture',
      job: 'khartoum',
      city: '1'
  },
   {
       image_url: 'img/KHArch3.jpg',
       name: 'برج الفاتح ',
       field: 'Architecture',
       job: 'khartoum',
       city: '1'
   },

        ]

        $scope.ArtKH = [
{
    image_url: 'img/KHEV.jpg',
    name: 'مهرجان الخرطوم للفيلم العربي ',
    field: 'Art',
    job: 'khartoum',
    city: '1'
},
{
    image_url: 'img/KHArch4.jpg',
    name: 'المسرح القومي ',
    field: 'Art',
    job: 'khartoum',
    city: '1'
},
        ]

        $scope.NatureKH = [
{
    image_url: 'img/KHNature.jpg',
    name: 'جزيرة توتي ',
    field: 'Nature',
    job: 'khartoum',
    city: '1'
},
{
    image_url: 'img/KHNature1.jpg',
    name: 'مقرن النيلين ',
    field: 'Nature',
    job: 'khartoum',
    city: '1'
},
        ]






        $scope.women = [
     {
         image_url: 'https://i1.wp.com/travelarab.net/wp-content/uploads/2017/09/%D8%A8%D8%B1%D8%AC-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7.jpg2_.jpg?resize=680%2C442',
         name: 'brjfhath',
         field: 'Archtiecture',
         job: 'khartoum',
         city:'1'
     },
           {
               image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Barcelona_Restaurant%2C_Khartoum_-_%D9%85%D8%B7%D8%B9%D9%85_%D8%A8%D8%B1%D8%B4%D9%84%D9%88%D9%86%D8%A9%2C_%D8%A7%D9%84%D8%AE%D8%B1%D8%B7%D9%88%D9%85.JPG',
               name: 'brcalona',
               field: 'food',
               job: 'KHARTOUM',
               city:'1'
           },
     {
         image_url: 'https://considerthesauce.files.wordpress.com/2011/01/khar3.jpg',
         name: 'Khartoum Centre Restaurant',
         field: 'food',
         job: 'KHARTOUM',
         city:'1'
     },
        {
            image_url: 'https://igx.4sqi.net/img/general/600x600/70687795_hg771nQgK1NRNYEbhR9senUr5kJTr3gcH28IStABQdQ.jpg',
            name: 'Dream Cafi',
            field: 'Resturant',
            job: 'wdmadni',
            city:'2'
        },
    {
        image_url: 'https://modo3.com/thumbs/fit630x300/166855/1491137002/%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D9%88%D8%AF_%D9%85%D8%AF%D9%86%D9%8A_%D9%81%D9%8A_%D8%A7%D9%84%D8%B3%D9%88%D8%AF%D8%A7%D9%86.jpg',
        name: 'Nile Street',
        field: 'Nature',
        job: 'wdmadni',
        city:'2'
    },
    {
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/%D8%A7%D9%84%D8%B3%D9%86%D9%8A.jpg/280px-%D8%A7%D9%84%D8%B3%D9%86%D9%8A.jpg',
        name: 'Mosq',
        field: 'Architecture',
        job: 'wdmadni',
        city:'2'
     
    }
        ]
       


    }

    ;
})();