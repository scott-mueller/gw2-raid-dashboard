import alacrity from '../img/boon-icons/Alacrity.png';
import might from '../img/boon-icons/Might.png';
import fury from '../img/boon-icons/Fury.png';
import quickness from '../img/boon-icons/Quickness.png';

import conditionDuration from '../img/attribute-icons/Condition_Duration.png';
import healingPower from '../img/attribute-icons/Healing_Power.png';
import power from '../img/attribute-icons/Power.png';

import bannerOfDiscipline from '../img/attribute-icons/Banner_of_Discipline.png';

const roleIconMap = {
    alacrity,
    might,
    fury,
    quickness,
    'condi-dps': conditionDuration,
    'power-dps': power,
    healer: healingPower,
    banners: bannerOfDiscipline
};

export default roleIconMap;
