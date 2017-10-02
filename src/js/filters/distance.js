angular
  .module('petsApp')
  .filter('distanceFrom', distanceFrom);

function distanceFrom() {
  return function(pets, distance) {
    // custom filter that takes two arguments, the array of pets, and the distance to check
    if(!pets) return false;
    // only return pets where the distance is less than the specified distance from the slider
    return pets.filter(pet => pet.distance < distance);
  };
}
