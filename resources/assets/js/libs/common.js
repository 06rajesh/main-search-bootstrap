/**
 * Created by Rajesh on 11/13/17.
 */

import {decode, encode} from 'html-encoder-decoder';

/**
 * converts array-like object to array
 * @param  collection the object to be converted
 * @return {Array} the converted object
 */
export function arrayFy(collection) {
    return Array.prototype.slice.call(collection);
}

function checkIfHasElementByTag(element, tag){
    let checkElem = element.getElementsByTagName(tag);
    return (checkElem.length > 0);
}

function removeElementByTag(element, tag) {

    let removeAbles = element.getElementsByTagName(tag);

    if(removeAbles.length > 0){
         for (let index = removeAbles.length - 1; index >= 0; index--) {
             removeAbles[index].parentNode.removeChild(removeAbles[index]);
         }
    }
    return element;
}

function addClassByTag(element, tag, classNames) {
    let targetElements = element.getElementsByTagName(tag);
    if(targetElements.length > 0){
        for (let index = targetElements.length - 1; index >= 0; index--) {
            targetElements[index].className += ' ' + classNames;
        }
    }
    return element;
}

function getProcessedText(cells, formatImage = false){
    //Removing SUP elements from the cell Content
    let modifiedCells = removeElementByTag(cells, 'sup');

    if(formatImage) modifiedCells = addClassByTag(modifiedCells, 'img', 'img-thumbnail');
    return encode(modifiedCells.innerHTML);
}



/**
 * converts Wikipedia Infobox to JsonObject Divided into Images, titles and attributes
 * @param  encodedHtml Encoded String of Wikipedia Infobox from JSon
 * @return {data} JSON Object of infobox table
 */
export function ParseHtmlTable(encodedHtml) {
    let data = {};
    let attributes = [];
    let main = {};
    let secondary = [];
    let others = [];

    let htmlString = decode(encodedHtml);
    let trimmed = htmlString.replace(/(\r\n|\n|\r)/gm,"");
    const parser = new DOMParser();
    let doc = parser.parseFromString(trimmed, "text/html");

    let table = doc.getElementsByTagName('table')[0];
    //let images = table.getElementsByTagName('img');
    if(table.getElementsByTagName('caption').length > 0){
        data['title'] = table.getElementsByTagName('caption')[0].innerText;
    }

    let temp = {};

    arrayFy(table.rows).map((row) => {
        if(row.cells[1]) {
            if(Object.keys(main).length < 4){
                main[row.cells[0].innerText.trim().replace(/[&\/\\#,•$~%'":*?<>|]/g, '')] = getProcessedText(row.cells[1]);
            }else{
                temp[row.cells[0].innerText.trim().replace(/[&\/\\#,•$~%'":*?<>|]/g, '')] = getProcessedText(row.cells[1]);
            }

        }else{
            if(row.cells[0].tagName.toUpperCase() == 'TH' && !data['title'] && Object.keys(main).length < 3){
                data['title'] = row.cells[0].innerText;
            }else if(row.cells[0].getElementsByTagName('img').length > 0 && !data['image']){
                let imageObject = row.cells[0].getElementsByTagName('img')[0];

                let image = {};
                image['src'] = imageObject.src;
                image['alt'] = imageObject.alt;
                image['caption'] = row.cells[0].innerText;
                data['image'] = image;
            }else if(row.cells[0].tagName.toUpperCase() == 'TH'){
                if(Object.keys(temp).length > 1){
                    attributes.push(temp);
                }else{
                    secondary.push(temp['title']);
                }
                temp = {};
                temp['title'] = row.cells[0].innerText;
            }else if(row.cells[0].innerText || checkIfHasElementByTag(row.cells[0], 'img')){
                if(!data['title']){
                    data['title'] = row.cells[0].innerText;
                }else if(Object.keys(main).length < 4){
                    if(checkIfHasElementByTag(row.cells[0], 'img')){
                        secondary.push(getProcessedText(row.cells[0]), true);
                    } else{
                        secondary.push(row.cells[0].innerText);
                    }
                }else if(Object.keys(temp).length < 2){
                    temp[0] = getProcessedText(row.cells[0], true);
                }else{
                    others.push(getProcessedText(row.cells[0], true));
                }

            }
        }
    });

    if(Object.keys(temp).length > 0){
        attributes.push(temp);
    }

    if(others.length > 0){
        others['title'] = ' অন্যান্য';
        attributes.push(others);
    }

    if(secondary.length > 0){
        data['secondary'] = secondary;
    }

    attributes.unshift(main);
    data['attributes'] = attributes;
    return data;
}

/**
 * converts Suiteable array for pagination
 * @param  total total result for query
 * @param range result range in page
 * @param current page
 * @return {pages} array for pagination
 */

export function getPaginationArray(total, range, current=1){

    let totalPageShow = 9;
    let totalPages = Math.ceil(total/range);
    let pages = [];
    if(current < Math.ceil(totalPageShow/2)){
        let end = totalPages > totalPageShow ? 9 : totalPages;
        for(let i = 1; i <= end; i++){
            pages.push(i);
        }
    }else if(current > (totalPages - Math.ceil(totalPageShow/2))){
        let start = totalPages - totalPageShow + 1;
        for(let i = start; i <= totalPages; i++){
            if(i > 0)   pages.push(i);
        }
    }else{
        let start = current - parseInt(Math.floor(totalPageShow/2));
        let end = +current + +parseInt(Math.floor(totalPageShow/2));
        for(let i = start; i <= end; i++){
            pages.push(i);
        }
    }

    pages.unshift(1);
    pages.push(totalPages);

    return pages;
}

const numberDict = {
    0 : '০',
    1 : '১',
    2 : '২',
    3 : '৩',
    4 : '৪',
    5 : '৫',
    6 : '৬',
    7 : '৭',
    8 : '৮',
    9 : '৯'
};

export function convertNumberToBengali(num) {
    let bengaliNum = '';
    let numString = num.toString();

    for(let i=0; i < numString.length; i++){
        if(numberDict.hasOwnProperty(numString[i])){
            bengaliNum += numberDict[numString[i]];
        }
    }

    return bengaliNum;
}