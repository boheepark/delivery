var fs = require('fs');
var cheerio = require('cheerio');

var menu = {};

var filename = 'menutable.html';
var html = '';
fs.readFile(filename, function(err, data){
  if(err){
    console.error(err);
  }
  html += data;
  var $ = cheerio.load(html);
  var type;

  $('.menu_items').children().each(function(i, el){
    if(i % 2 === 0){
      type = $(el).find('h4').text();
      menu[type] = [];
    } else {
      $(el).children().each(function(j, item){
        var itemArr = $(item).text().split('\n');
        itemArr.forEach(function(line, i){
          itemArr[i] = line.replace(/^\s+|\s+$/g, '');
        });
        itemArr = itemArr.filter(function(item){
          if(item === ''){
            return false;
          } else {
            return true;
          }
        });
        if(itemArr.length === 3){
          if(itemArr[2].includes('+')){
            itemArr[2] = itemArr[2].substring(0, itemArr[2].length - 1);
          }
          menu[type].push({
            name: itemArr[0],
            desc: itemArr[1],
            price: itemArr[2]
          });
        } else if(itemArr.length === 2){
          menu[type].push({
            name: itemArr[0],
            price: itemArr[1]
          });
        }
      });
    }
  });

  // $('.groups_wrapper').children().each(function(i, el){
  //   // console.log($(el).find($('items_wrapper')));
  //   console.log(i, $(el).text());
  //   var menuType = $(el).text();
  //   if(!menu[menuType]){
  //     menu[menuType] = [];
  //   }
  //   $('.items_wrapper').children().each(function(j, item){
  //     console.log(j, $(item).text())
  //     if(i === j){
  //       var itemArr = $(item).text().split('\n');
  //       itemArr.forEach(function(line, i){
  //         itemArr[i] = line.replace(/^\s+|\s+$/g, '');
  //       });
  //       itemArr.filter(function(item){
  //         return item !== '';
  //       });
  //       if(itemArr.length === 3){
  //         if(itemArr[2].includes('+')){
  //           itemArr[2] = itemArr[2].substring(0, itemArr[2].length - 1);
  //         }
  //         menu[menuType].push({
  //           name: itemArr[0],
  //           desc: itemArr[1],
  //           price: itemArr[2]
  //         });
  //       } else if(itemArr.length === 2){
  //         menu[menuType].push({
  //           name: itemArr[0],
  //           price: itemArr[1]
  //         })
  //       }
  //     }
  //   });
  // });

  // $('.items_wrapper').children().each(function(i, el){
  //   var asdf = $(el).text().split('\n');
  //   var itemArray = [];
  //   asdf.forEach(function(line, i){
  //     asdf[i] = line.replace(/^\s+|\s+$/g, '');
  //     if(asdf[i] !== ''){
  //       itemArray.push(asdf[i]);
  //     }
  //   });
  //   if(itemArray.length === 3){
  //     if(itemArray[2].includes('+')){
  //       itemArray[2] = itemArray[2].substring(0, itemArray[2].length -1);
  //     }
  //     menu.push({
  //       name: itemArray[0],
  //       desc: itemArray[1],
  //       price: Number(itemArray[2])
  //     });
  //   } else if(itemArray.length === 2){
  //     menu.push({
  //       name: itemArray[0],
  //       price: Number(itemArray[1])
  //     });
  //   }
  // });

  // console.log($('.items_wrapper').children().first());
  // $asdf = $('.items_wrapper').children().first().next().text().split('\n');

  fs.writeFile('menu.json', JSON.stringify(menu), function(err){
    if(err){
      console.error(err);
    }
  });
});

// console.log(html);
