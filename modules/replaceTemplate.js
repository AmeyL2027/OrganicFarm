module.exports = (temp, product) =>{
    // console.log(temp);
    // here the '/' before and after the PRODUCTNAME makes it a regularexpression from a nrml string, 
    //because we might have more than one occurance of the placeholder and we want to replace all of them
    // thats why we add g at the end which means globally
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
    // here we are manipulating the output variable and using it again and again, 
    //thats why we used let instead of const. 
    // And we can directly replace it in the temp itself, but that is not a good practise
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    // the product.organic is a special case, (i.e. if the product is not organic we will display none,
    // we have a css class .not-organic, hence we have the if condition)
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}