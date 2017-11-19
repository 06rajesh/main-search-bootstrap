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
                main[row.cells[0].innerText.trim()] = getProcessedText(row.cells[1]);
            }else{
                temp[row.cells[0].innerText.trim()] = getProcessedText(row.cells[1]);
            }

        }else{
            if(row.cells[0].tagName.toUpperCase() == 'TH' && !data['title']){
                data['title'] = row.cells[0].innerText;
            }else if(row.cells[0].getElementsByTagName('img').length > 0 && !data['image']){
                let imageObject = row.cells[0].getElementsByTagName('img')[0];

                let image = {};
                image['src'] = imageObject.src;
                image['alt'] = imageObject.alt;
                image['caption'] = row.cells[0].innerText;
                data['image'] = image;
            }else if(row.cells[0].tagName.toUpperCase() == 'TH'){
                attributes.push(temp);
                temp = {};
                temp['title'] = row.cells[0].innerText;
            }else if(row.cells[0].innerText || checkIfHasElementByTag(row.cells[0], 'img')){
                if(Object.keys(temp).length < 2){
                    temp[0] = getProcessedText(row.cells[0], true);
                }else{
                    others.push(getProcessedText(row.cells[0], true));
                }
            }
        }
    });
    attributes.push(temp);

    if(others.length > 0){
        others['title'] = ' অন্যান্য';
        attributes.push(others);
    }

    attributes.unshift(main);
    data['attributes'] = attributes;
    return data;
}
