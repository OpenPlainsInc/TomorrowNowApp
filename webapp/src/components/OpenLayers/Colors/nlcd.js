/*
 * Filename: nlcd.js
 * Project: TomorrowNow
 * File Created: Monday April 4th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon May 02 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

class NLCD {
    constructor(...categories) {
        this.categories = categories
        // this.families = families
    }

    *getCategories() {
        for(const categories of this.categories){
          yield categories;
        }
    }

    families() {
        let tmpSet = new Set(this.categories.map(f => f.family))
        return tmpSet
    }

}

class NLCDCategory {
    constructor(family, family_label, family_color, category, category_label, category_color, description) {
        this.family = family;
        this.family_label = family_label;
        this.family_color = family_color
        this.category = category;
        this.category_label = category_label;
        this.category_color = category_color;
        this.description = description
    }
}

const nlcdCats = new NLCD(
    //Water
    new NLCDCategory(1, "Water", "#476ba1", 11, "Open Water", "#476ba1", "Areas of open water, generally with less than 25% cover of vegetation or soil"),
    new NLCDCategory(1, "Water", "#476ba1", 12, "Perennial Ice/Snow", "#d1defa", "Areas characterized by a perennial cover of ice and/or snow, generally greater than 25% of total cover."),

    //Developed
    new NLCDCategory(2, "Developed", "#decaca", 21, "Developed, Open Space", "#decaca", "Areas with a mixture of some constructed materials, but mostly vegetation in the form of lawn grasses. Impervious surfaces account for less than 20% of total cover. These areas most commonly include large-lot single-family housing units, parks, golf courses, and vegetation planted in developed settings for recreation, erosion control, or aesthetic purposes."),
    new NLCDCategory(2, "Developed", "#decaca", 22, "Developed, Low Intensity", "#d99482", "Areas with a mixture of constructed materials and vegetation. Impervious surfaces account for 20% to 49% percent of total cover. These areas most commonly include single-family housing units."),
    new NLCDCategory(2, "Developed", "#decaca", 23, "Developed, Medium Intensity", "#ee0000", "Aareas with a mixture of constructed materials and vegetation. Impervious surfaces account for 50% to 79% of the total cover. These areas most commonly include single-family housing units."),
    new NLCDCategory(2, "Developed", "#decaca", 24, "Developed High Intensity", "#ab0000", "Highly developed areas where people reside or work in high numbers. Examples include apartment complexes, row houses and commercial/industrial. Impervious surfaces account for 80% to 100% of the total cover."),

    //Barren
    new NLCDCategory(3, "Barren", "#b3aea3", 31, "Barren Land (Rock/Sand/Clay)", "#b3aea3", "Areas of bedrock, desert pavement, scarps, talus, slides, volcanic material, glacial debris, sand dunes, strip mines, gravel pits and other accumulations of earthen material. Generally, vegetation accounts for less than 15% of total cover."),

    //Forest
    new NLCDCategory(4, "Forest", "#68ab63", 41, "Deciduous Forest", "#68ab63", "Areas dominated by trees generally greater than 5 meters tall, and greater than 20% of total vegetation cover. More than 75% of the tree species shed foliage simultaneously in response to seasonal change."),
    new NLCDCategory(4, "Forest", "#68ab63", 42, "Evergreen Forest", "#1c6330", "Areas dominated by trees generally greater than 5 meters tall, and greater than 20% of total vegetation cover. More than 75% of the tree species maintain their leaves all year. Canopy is never without green foliage."),
    new NLCDCategory(4, "Forest", "#68ab63", 43, "Mixed Forest", "#b5ca8f", "Areas dominated by trees generally greater than 5 meters tall, and greater than 20% of total vegetation cover. Neither deciduous nor evergreen species are greater than 75% of total tree cover."),

    //Shrubland
    new NLCDCategory(5, "Shrubland", "#a68c30", 51, "Dwarf Scrub", "#a68c30", "Alaska only areas dominated by shrubs less than 20 centimeters tall with shrub canopy typically greater than 20% of total vegetation. This type is often co-associated with grasses, sedges, herbs, and non-vascular vegetation."),
    new NLCDCategory(5, "Shrubland", "#a68c30", 52, "Shrub/Scrub", "#ccba7d", "Areas dominated by shrubs; less than 5 meters tall with shrub canopy typically greater than 20% of total vegetation. This class includes true shrubs, young trees in an early successional stage or trees stunted from environmental conditions."),

    //Herbaceous
    new NLCDCategory(7, "Herbaceous", "#e3e3c2", 71, "Grassland/Herbaceous", "#e3e3c2", "Areas dominated by gramanoid or herbaceous vegetation, generally greater than 80% of total vegetation. These areas are not subject to intensive management such as tilling, but can be utilized for grazing."),
    new NLCDCategory(7, "Herbaceous", "#e3e3c2", 72, "Sedge/Herbaceous", "#caca78", "Alaska only areas dominated by sedges and forbs, generally greater than 80% of total vegetation. This type can occur with significant other grasses or other grass like plants, and includes sedge tundra, and sedge tussock tundra."),
    new NLCDCategory(7, "Herbaceous", "#e3e3c2", 73, "Lichens", "#99c247", "Alaska only areas dominated by fruticose or foliose lichens generally greater than 80% of total vegetation."),
    new NLCDCategory(7, "Herbaceous", "#e3e3c2", 74, "Moss", "#78ae94", "Alaska only areas dominated by mosses, generally greater than 80% of total vegetation."),

    //Planted/Cultvated
    new NLCDCategory(8, "Planted/Cultvated", "#dcd93d", 81, "Pasture/Hay", "#dcd93d", "Areas of grasses, legumes, or grass-legume mixtures planted for livestock grazing or the production of seed or hay crops, typically on a perennial cycle. Pasture/hay vegetation accounts for greater than 20% of total vegetation."),
    new NLCDCategory(8, "Planted/Cultvated", "#dcd93d", 82, "Cultivated Crops", "#ab7028", "Areas used for the production of annual crops, such as corn, soybeans, vegetables, tobacco, and cotton, and also perennial woody crops such as orchards and vineyards. Crop vegetation accounts for greater than 20% of total vegetation. This class also includes all land being actively tilled."),

    //Wetlands
    new NLCDCategory(9, "Wetlands", "#bad9eb", 90, "Woody Wetlands", "#bad9eb", "Areas where forest or shrubland vegetation accounts for greater than 20% of vegetative cover and the soil or substrate is periodically saturated with or covered with water."),
    new NLCDCategory(9, "Wetlands", "#bad9eb", 95, "Emergent Herbaceous Wetlands", "#70a3ba", "Areas where perennial herbaceous vegetation accounts for greater than 80% of vegetative cover and the soil or substrate is periodically saturated with or covered with water.")

)

const nlcd =  [
    'case',
    ['==', ['band', 1], 1], 
    "#00fa00", 
    ['==', ['band', 11], 11],
    "#476ba1",
    ['==', ['band', 12], 12],
    "#d1defa",
    ['==', ['band', 21], 21],
    "#decaca",
    ['==', ['band', 22], 22],
    "#d99482",
    ['==', ['band', 23], 23],
    "#ee0000",
    ['==', ['band', 24], 24],
    "#ab0000",
    ['==', ['band', 31], 31],
    "#b3aea3",
    ['==', ['band', 32], 32],
    "#fafafa",
    ['==', ['band', 41], 41],
    "#68ab63",
    ['==', ['band', 42], 42],
    "#1c6330",
    ['==', ['band', 43], 43],
    "#b5ca8f",
    ['==', ['band', 51], 51],
    "#a68c30",
    ['==', ['band', 52], 52],
    "#ccba7d",
    ['==', ['band', 71], 71],
    "#e3e3c2",
    ['==', ['band', 72], 72],
    "#caca78",
    ['==', ['band', 73], 73],
    "#99c247",
    ['==', ['band', 74], 74],
    "#78ae94",
    ['==', ['band', 81], 81],
    "#dcd93d",
    ['==', ['band', 82], 82],
    "#ab7028",
    ['==', ['band', 90], 90],
    "#bad9eb",
    ['==', ['band', 91], 91],
    "#b5d4e6",
    ['==', ['band', 92], 92],
    "#b5d4e6",
    ['==', ['band', 93], 93],
    "#b5d4e6",
    ['==', ['band', 94], 94],
    "#b5d4e6",
    ['==', ['band', 95], 95],
    "#70a3ba",
    '#fff'
]

export default nlcdCats