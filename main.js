function printReceipt(barcodes) {


if(isEmpty(barcodes)){
	console.log("");
}
const database =getAllDatabase();

var barcodeCount=countGroupByBarcode(barcodes);

var list =  itemList(barcodeCount,database);

var header =`
***<store earning no money>Receipt ***\n`

var subtotal =Subtotal(list);

var line ="----------------------\n"

var total = TotalSpend(list);

var footer ="**********************"


var receipt =header+subtotal+line+total+footer;

console.log(receipt);

}


function isEmpty(barcodes){
	if(barcodes==null||barcodes.length==0){
		return true;
	}
	
}

function countGroupByBarcode(barcodes){
	 var  barcodeCount= {}; 
     for(var i= 0; i< barcodes.length; i++){ 
       var barcode = barcodes[i]; 
       barcodeCount[barcode] = (barcodeCount[barcode] +1 ) || 1; 
     } 
  return barcodeCount;
}

function itemList(barcodeCount,database){
	var list=[];
	var barcodes =Object.keys(barcodeCount);
	for(let i=0;i<barcodes.length;i++){
		for(let j=0;j<database.length;j++){
			if(barcodes[i]==database[j].barcode){
				var obj ={};
				obj.name=database[j].name;
				obj.price=database[j].price;
				obj.num=barcodeCount[barcodes[i]];
				list.push(obj);
			}
		}
	}
	return list;
}


function Subtotal(list){
	subtotal="";
	for(let i=0;i<list.length;i++){
		subtotal+="Name: "+list[i].name+", Quantity: "+list[i].num+", Unit price: "+list[i].price+" (yuan), Subtotal: "+list[i].price*list[i].num+" (yuan)\n"
	}
	return subtotal
}


function TotalSpend(list){
	var total ="";
	var sum=0;
	for(let i=0;i<list.length;i++){
		sum+=list[i].num*list[i].price;
	}
	total+="Total: "+sum+" (yuan)\n";
	return total;
}



function getAllDatabase(){
	const database=[
   {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      price: 3
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      price: 3
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      price: 5
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      price: 15
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      price: 2
    },
    {
      barcode: 'ITEM000005',
      name: 'Instant Noodles',
      price: 4
    }
]
return database;
}
module.exports = {
    printReceipt
};