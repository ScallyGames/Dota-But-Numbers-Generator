const transformations = require('./src/shared/transformation-functions');
const filters = require('./src/shared/filter-functions');

const generalSettings = {
    name: 'dota2_but_we_like_long_names',
    targetDirectory: 'C:\\Users\\<User>\\Documents\\Projects\\Dota2Buts',
    dotaPath: 'C:\\Program Files (x86)\\Steam\\SteamApps\\common\\dota\ 2\ beta',
}

const localize = require('./src/shared/localize')(generalSettings.dotaPath);

const settings = () => {
    return {
        ... generalSettings,
        generate: 
        {
            units: false,
            heroes: false,
            items: true,
            abilities: true,
        },
        units:
        {
            dataTransformationFunction: transformations.times(10),
            shouldProcessKey: filters.blacklist(unitsKeyBlacklist),
            shouldProcessField: filters.whitelist(unitsFieldWhitelist),
            additionalTransformation: transformations.noop,
        },
        heroes:
        {
            dataTransformationFunction: transformations.times(10),
            shouldProcessKey: filters.blacklist(heroesKeyBlacklist),
            shouldProcessField: filters.whitelist(heroesFieldWhitelist),
            additionalTransformation: transformations.noop,
        },
        items:
        {
            dataTransformationFunction: itemTransformationFunction,
            shouldProcessKey: filters.and(filters.blacklist(itemsBlacklist), filters.blacklistSubstring('recipe')),
            shouldProcessField: filters.blacklist(itemsBlacklist),
            additionalTransformation: transformations.noop,
            scalingFunction: transformations.f_one,
            extrapolateLevel: null,
        },
        abilities:
        {
            dataTransformationFunction: abilityTransformationFunction,
            shouldProcessKey: filters.and(filters.blacklist(abilityBlacklist), filters.blacklistSubstring('special_bonus_unique')),
            shouldProcessField: filters.blacklist(abilityBlacklist),
            additionalTransformation: transformations.noop,
            scalingFunction: transformations.f_one,
            extrapolateLevel: null,
        },
    };
};

var unitsTransformationFunction = (current, scaling, level, key, dataObjects) => {
    return current * 10;
};

var unitsKeyBlacklist = [
    'Version',
    'npc_dota_units_base',
    'npc_dota_thinker',
    'npc_dota_companion',
    'npc_dota_loadout_generic',
];

var unitsFieldWhitelist = [
    // 'VisionDaytimeRange',
    // 'VisionNighttimeRange',
    'StatusHealth',
    'StatusMana',
    // 'MovementSpeed',
    // 'BountyXP',
    // 'BountyGoldMin',
    // 'BountyGoldMax',
    'AttributeBaseStrength',
    'AttributeStrengthGain',
    'AttributeBaseIntelligence',
    'AttributeIntelligenceGain',
    'AttributeBaseAgility',
    'AttributeAgilityGain',
    'StatusHealthRegen',
    'StatusManaRegen',
    // 'FollowRange',
    // 'ProjectileSpeed',
    // 'BaseAttackSpeed',
    // 'MovementTurnRate',
    'AttackDamageMin',
    'AttackDamageMax',
    'ArmorPhysical',
    'MagicalResistance',
    'AttackDamageMin',
    'AttackDamageMax',
    // 'AttackRate',
    // 'AttackAnimationPoint',
    // 'AttackAcquisitionRange',
    // 'AttackRange',
    // 'AttackRangeBuffer'
];

var heroesTransformationFunction = (current, scaling, level, ke, dataObject) => {
    return current * 10;
};

var heroesKeyBlacklist = [
    'npc_dota_hero_base',
];

var heroesFieldWhitelist = [
    // 'VisionDaytimeRange',
    // 'VisionNighttimeRange',
    'StatusHealth',
    'StatusMana',
    // 'MovementSpeed',
    // 'BountyXP',
    // 'BountyGoldMin',
    // 'BountyGoldMax',
    'AttributeBaseStrength',
    'AttributeStrengthGain',
    'AttributeBaseIntelligence',
    'AttributeIntelligenceGain',
    'AttributeBaseAgility',
    'AttributeAgilityGain',
    'StatusHealthRegen',
    'StatusManaRegen',
    // 'FollowRange',
    // 'ProjectileSpeed',
    // 'BaseAttackSpeed',
    // 'MovementTurnRate',
    'AttackDamageMin',
    'AttackDamageMax',
    'ArmorPhysical',
    'MagicalResistance',
    'AttackDamageMin',
    'AttackDamageMax',
    // 'AttackRate',
    // 'AttackAnimationPoint',
    // 'AttackAcquisitionRange',
    // 'AttackRange',
    // 'AttackRangeBuffer'
    // 'AttackRangeBuffer'
];

let itemNames = {};
let minItemLength = 4;
let medianItemLength = 10;
let maxItemLength = 25;

var itemTransformationFunction = (current, base, scaling, level, key, dataObject, dataKey) =>
{
    var name;
    switch(dataKey)
    {
        case 'item_recipe_moon_shard':
            name = 'Recipe: Moon Shard';
            break;
        case 'item_recipe_ward_dispenser':
            name = 'Recipe: Ward Dispenser';
            break;
        case 'item_recipe_travel_boots_2':
            name = 'Recipe: Travel Boots 2';
            break;
        case 'item_recipe_phase_boots':
            name = 'Recipe: Phase Boots';
            break;
        case 'item_recipe_power_treads':
            name = 'Recipe: Power Treads';
            break;
        case 'item_recipe_grandmasters_glaive':
            name = 'Recipe: Grandmasters Glaive';
            break;
        case 'item_recipe_oblivion_staff':
            name = 'Recipe: Oblivion Staff';
            break;
        case 'item_recipe_pers':
            name = 'Recipe: Pers';
            break;
        case 'item_recipe_poor_mans_shield':
            name = 'Recipe: Poor Mans Shield';
            break;
        case 'item_recipe_sheepstick':
            name = 'Recipe: Sheepstick';
            break;
        case 'item_recipe_echo_sabre':
            name = 'Recipe: Echo Sabre';
            break;
        case 'item_recipe_dagon_2':
            name = 'Recipe: Dagon 2';
            break;
        case 'item_recipe_dagon_3':
            name = 'Recipe: Dagon 3';
            break;
        case 'item_recipe_dagon_4':
            name = 'Recipe: Dagon 4';
            break;
        case 'item_recipe_dagon_5':
            name = 'Recipe: Dagon 5';
            break;
        case 'item_recipe_necronomicon_2':
            name = 'Recipe: Necronomicon 2';
            break;
        case 'item_recipe_necronomicon_3':
            name = 'Recipe: Necronomicon 3';
            break;
        case 'item_recipe_ultimate_scepter':
            name = 'Recipe: Ultimate Scepter';
            break;
        case 'item_recipe_lotus_orb':
            name = 'Recipe: Lotus Orb';
            break;
        case 'item_recipe_vanguard':
            name = 'Recipe: Vanguard';
            break;
        case 'item_recipe_soul_booster':
            name = 'Recipe: Soul Booster';
            break;
        case 'item_recipe_hood_of_defiance':
            name = 'Recipe: Hood Of Defiance';
            break;
        case 'item_recipe_rapier':
            name = 'Recipe: Rapier';
            break;
        case 'item_recipe_butterfly':
            name = 'Recipe: Butterfly';
            break;
        case 'item_recipe_dragon_lance':
            name = 'Recipe: Dragon Lance';
            break;
        case 'item_recipe_invis_sword':
            name = 'Recipe: Invis Sword';
            break;
        case 'item_recipe_sange_and_yasha':
            name = 'Recipe: Sange And Yasha';
            break;
        case 'item_recipe_skadi':
            name = 'Recipe: Skadi';
            break;
        case 'item_recipe_desolator':
            name = 'Recipe: Desolator';
            break;
        case 'item_recipe_ethereal_blade':
            name = 'Recipe: Ethereal Blade';
            break;
        case 'item_recipe_arcane_boots':
            name = 'Recipe: Arcane Boots';
            break;
        case 'item_recipe_medallion_of_courage':
            name = 'Recipe: Medallion Of Courage';
            break;
        case 'item_recipe_ring_of_aquila':
            name = 'Recipe: Ring Of Aquila';
            break;
        default:
            try
            {
                name = localize('DOTA_Tooltip_Ability_' + dataKey);
            }
            catch(e)
            {
                console.log('Item: ' + e);
            }
            break;
    }
    itemNames[name] = true;
    
    let sortedItemNameLengths = Object.keys(itemNames).map(x => x.length).sort((a, b) => a - b);
    if(sortedItemNameLengths.length === 277)
    {
        // console.log(sortedItemNameLengths[0]);
        // console.log(sortedItemNameLengths[Math.floor(sortedItemNameLengths.length / 4)]);
        // console.log(sortedItemNameLengths[sortedItemNameLengths.length - 1]);
    }
    let shift = 0;
    let scale = 0.8;

    let factor = 1 + (Math.max(8, Math.min(name.length, 20)) - medianItemLength) / (medianItemLength - minItemLength) * scale + shift;
    return current * factor;
} 

var itemsBlacklist = [
    'Version',
    'ability_base',
    'dota_base_ability',
    'default_attack',
    'attribute_bonus',
    'special_bonus_attributes',
    'ability_capture',
    'ID',
    'OnCastbar',
    'OnLearnbar',
    'FightRecapLevel',
    'AbilitySharedCooldown',
    'AbilityModifierSupportValue',
    'AbilityModifierSupportBonus',
    'ItemCombinable',
    'ItemPermanent',
    'ItemStackable',
    'ItemRecipe',
    'ItemDroppable'	,
    'ItemPurchasable',
    'ItemSellable',
    'ItemRequiresCharges',
    'ItemKillable',
    'ItemDisassemblable',
    'ItemShareability',
    'ItemDeclaresPurchase',
    'ItemIsNeutralDrop',
    'AbilityBehavior',
    'AbilityUnitTargetTeam',
    'AbilityUnitTargetType',
    'SpellImmunityType',
    'MaxLevel',
    'AbilitySound',
    'HasShardUpgrade',
    'HasScepterUpgrade',
    'IsGrantedByShard',
    'IsGrantedByScepter',
    'AbilityCastAnimation',
    'AbilityType',
    'RequiresScepter',
    'RequiresShard',
    'ItemShopTags',
    'ItemBaseLevel',
    'ShouldBeSuggested',
    'IsObsolete',
    'IsShardUpgrade',
    'ItemContributesToNetWorthWhenDropped',
    'AllowedInBackpack',
    'IsTempestDoubleClonable',
    'AnimationIgnoresModelScale',
    'AbilityCastAnimation',
    'AnimationPlaybackRate',
    'RequiredLevel',
    'LevelsBetweenUpgrades',
    'BaseClass',
    'AbilityBehavior',
    'AbilityTextureName',
    'AbilityUnitTargetTeam',
    'AbilityUnitTargetType',
    'AbilityUnitTargetFlags',
    'AbilityUnitDamageType',
    'AbilityType',
    'ItemStockMax',
    'ItemStockTime',
    'ItemStockInitial',
    'ItemDisplayCharges',
    'ItemRequiresCharges',
    'ItemStackable',
    'ItemPermanent',
    'ItemCastOnPickup',
    'SpellDispellableType',
    'AbilityDraftUltScepterAbility',
    'AbilityDraftUltShardAbility',
    'ItemInitialCharges',
    'AbilityCastPoint',
    'item_tpscroll',
    'backdoor_protection',
    'backdoor_protection_in_base',
    'projectile_speed',
    'AbilityCooldown',
    'AbilityCastRange',
    'AbilityManaCost',
    'ItemCost',
];

let abilityNames = {};
let minAbilityLength = 3
let medianAbilityLength = 9;
let reasonableMaxAbilityLength = 20;
let maxAbilityLength = 31;

var abilityTransformationFunction = (current, base, scaling, level, key, dataObject, dataKey) =>
{
    let name;
    switch(dataKey)
    {
        case 'morphling_morph':
            name = 'Morph';
            break;
        case 'death_prophet_witchcraft':
            name = 'Witchcraft';
            break;
        case 'slardar_scepter':
            name = 'Scepter';
            break;
        case 'necrolyte_sadist_stop':
            name = 'Sadist';
            break;
        case 'beastmaster_mark_of_the_beast':
            name = 'Mark of the Beast';
            break;
        case 'faceless_void_backtrack':
            name = 'Backtrack';
            break;
        case 'dragon_knight_frost_breath':
            name = 'Frost Breath';
            break;
        case 'dazzle_rain_of_vermin':
            name = 'Rain of Vermin'
            break;
        case 'clinkz_scepter':
            name = 'Scepter';
            break;
        case 'chen_test_of_faith_teleport':
            name = 'Test of Faith: Teleport';
            break;
        case 'invoker_attribute_bonus':
            name = 'Attribute Bonus';
            break;
        case 'undying_tombstone_zombie_aura':
            name = 'Tombstone Zombie Aura';
            break;
        case 'troll_warlord_scepter':
            name = 'Scepter';
            break;
        case 'monkey_king_primal_spring_early':
            name = 'Primal Spring (Early)';
            break;
        case 'dawnbreaker_luminosity':
            name = 'Luminosity';
            break;
        case 'special_bonus_unique_dawnbreaker_solar_guardian_radius':
            name = 'Solar Guardian';
            break;
        case 'special_bonus_unique_dawnbreaker_converge_slow':
            name = 'Converge';
            break;
        case 'special_bonus_unique_dawnbreaker_celestial_hammer_damage':
            name = 'Celestial Hammer';
            break;
        case 'special_bonus_unique_dawnbreaker_celestial_hammer_cast_range':
            name = 'Celestial Hammer';
            break;
        case 'special_bonus_unique_dawnbreaker_fire_wreath_charges':
            name = 'Fire Wreath';
            break;
        case 'special_bonus_unique_dawnbreaker_luminosity_crit':
            name = 'Luminosity';
            break;
        case 'special_bonus_unique_dawnbreaker_solar_guardian_cooldown':
            name = 'Solar Guardian';
            break;
        case 'courier_transfer_items_to_other_player':
            name = 'Transfer Items to other Player';
            break;
        case 'courier_dequeue_pickup_from_stash':
            name = 'Dequeue Pickup from Stash';
            break;
        case 'courier_take_stash_and_transfer_items':
            name = 'Take Stash and Transfer Items';
            break;
        case 'courier_morph':
            name = 'Morph';
            break;
        case 'roshan_spell_block':
            name = 'Spell Block';
            break;
        case 'roshan_halloween_spell_block':
            name = 'Halloween Spell Block';
            break;
        case 'roshan_bash':
            name = 'Bash';
            break;
        case 'roshan_slam':
            name = 'Slam';
            break;
        case 'roshan_devotion':
            name = 'Devotion';
            break;
        case 'granite_golem_bash':
            name = 'Bash';
            break;
        case 'ancient_golem_rockslide':
            name = 'Rockslide';
            break;
        case 'spawnlord_master_bash':
            name = 'Bash';
            break;
        case 'roshan_halloween_candy':
            name = 'Halloween Candy';
            break;
        case 'roshan_halloween_angry':
            name = 'Halloween Angry';
            break;
        case 'roshan_halloween_greater_bash':
            name = 'Halloween Greater Bash';
            break;
        case 'roshan_halloween_levels':
            name = 'Halloween Levels';
            break;
        case 'throw_snowball':
            name = 'Throw Snowball';
            break;
        case 'throw_coal':
            name = 'Throw Coal';
            break;
        case 'healing_campfire':
            name = 'Healing Campfire';
            break;
        case 'shoot_firework':
            name = 'Shoot Firework';
            break;
        case 'cny_beast_force_attack':
            name = 'Force Attack';
            break;
        case 'cny_beast_teleport':
            name = 'Teleport';
            break;
        default:
            try
            {
                name = localize('DOTA_Tooltip_ability_' + dataKey);
            }
            catch(e)
            {
                console.log(e);
            }
            break;
    }
    abilityNames[name] = true;

    let sortedAbilityLengths = Object.keys(abilityNames).map(x => x.length).sort((a, b) => a - b);
    if(sortedAbilityLengths.length === 772)
    {
        // console.log(sortedAbilityLengths[0]);
        // console.log(sortedAbilityLengths[Math.floor(sortedAbilityLengths.length / 4)]);
        // console.log(sortedAbilityLengths[sortedAbilityLengths.length - 1]);
    }
    let shift = 0;
    let scale = 0.8;
    let factor = 1 + (Math.max(7, Math.min(name.length, reasonableMaxAbilityLength)) - medianAbilityLength) / (medianAbilityLength - minAbilityLength) * scale + shift;
    return current * factor;
}

var abilityBlacklist = [
    'Version',
    'ability_base',
    'dota_base_ability',
    'default_attack',
    'attribute_bonus',
    'special_bonus_attributes',
    'ability_capture',
    'ID',
    'OnCastbar',
    'OnLearnbar',
    'FightRecapLevel',
    'AbilitySharedCooldown',
    'AbilityModifierSupportValue',
    'AbilityModifierSupportBonus',
    'ItemCombinable',
    'ItemPermanent',
    'ItemStackable',
    'ItemRecipe',
    'ItemDroppable'	,
    'ItemPurchasable',
    'ItemSellable',
    'ItemRequiresCharges',
    'ItemKillable',
    'ItemDisassemblable',
    'ItemShareability',
    'ItemDeclaresPurchase',
    'ItemIsNeutralDrop',
    'AbilityBehavior',
    'AbilityUnitTargetTeam',
    'AbilityUnitTargetType',
    'SpellImmunityType',
    'MaxLevel',
    'AbilitySound',
    'HasShardUpgrade',
    'HasScepterUpgrade',
    'IsGrantedByShard',
    'IsGrantedByScepter',
    'AbilityCastAnimation',
    'AbilityType',
    'RequiresScepter',
    'RequiresShard',
    'ItemShopTags',
    'ItemBaseLevel',
    'ShouldBeSuggested',
    'IsObsolete',
    'IsShardUpgrade',
    'ItemContributesToNetWorthWhenDropped',
    'AllowedInBackpack',
    'IsTempestDoubleClonable',
    'AnimationIgnoresModelScale',
    'AbilityCastAnimation',
    'AnimationPlaybackRate',
    'RequiredLevel',
    'LevelsBetweenUpgrades',
    'BaseClass',
    'AbilityBehavior',
    'AbilityTextureName',
    'AbilityUnitTargetTeam',
    'AbilityUnitTargetType',
    'AbilityUnitTargetFlags',
    'AbilityUnitDamageType',
    'AbilityType',
    'ItemStockMax',
    'ItemStockTime',
    'ItemStockInitial',
    'ItemDisplayCharges',
    'ItemRequiresCharges',
    'ItemStackable',
    'ItemPermanent',
    'ItemCastOnPickup',
    'SpellDispellableType',
    'AbilityDraftUltScepterAbility',
    'AbilityDraftUltShardAbility',
    'ItemInitialCharges',
    'AbilityCastPoint',
    'item_tpscroll',
    'backdoor_protection',
    'backdoor_protection_in_base',
    'projectile_speed',
    'AbilityCooldown',
    'AbilityCastRange',
    'AbilityManaCost',
    'ItemCost',
];


module.exports = settings();