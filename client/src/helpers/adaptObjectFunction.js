export const adaptObject = (copyForm) => {
  delete copyForm.type;

  copyForm.attack = parseInt(copyForm.attack);
  copyForm.life = parseInt(copyForm.life);
  copyForm.defense = parseInt(copyForm.defense);
  copyForm.speed = parseInt(copyForm.speed);
  copyForm.height = parseInt(copyForm.height);
  copyForm.weight = parseInt(copyForm.weight);

  return copyForm;
};
