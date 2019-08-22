const {Order} = require('../models/');
const MailMiddleware = require('./mailControllers');

exports.placeOrder = async (req,res,next) => {
    const userId = req.user._id;
    const {items,total,transactionId,deliveryDetails} = req.body;
    const email = req.user.local.email || req.user.google.email;
    const name = req.user.name;
    try{
        const order = await Order.findOne({user:userId});
        let newOrder;
        const orderData = {
            items,
            total,
            transactionId,
            deliveryDetails
        }
        
        if(order){
            order.orders.push(orderData);
            newOrder = order;
        } else {
            newOrder = new Order();
            newOrder.user = userId;
            newOrder.orders.push(orderData);
        }
        const orderResponse = await newOrder.save();
        const message = orderSuccess(orderResponse.orders[orderResponse.orders.length - 1],name);
        MailMiddleware.sendMail(email,message);
        //MailMiddleware.placeOrderSuccess(orderResponse.orders[orderResponse.orders.length - 1],name)
        return res.status(200).json({order:orderResponse, message: 'Ordered successful'});
    } catch(err){
        const message = orderFailure(name,transactionId);
        MailMiddleware.sendMail(email,message);
        return next({
            status: 400,
            message: err.message
        })
    }
}

function orderSuccess(order,userName){
    let orderedItems = order.items.map(item => {
        return `
            <tr>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.count}</td>
                <td>${item.price * item.count}</td>
            </tr>
        `
    });

    orderedItems = orderedItems.join("");
    orderedItems += `<tr>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td>${order.total}</td>
                    </tr>`
    const {name,address,city,dist,state,pincode} = order.deliveryDetails;

    return `
        <table>
            <tr>
                Dear ${userName},
            </tr>
            <tr>
                Your order is placed successfully with transaction Id ${order.transactionId}.
            </tr>
            <tr>
                You have ordered below items.
            </tr>
        </table>
        <table>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Numbers</th>
                <th>Cost</th>
            </tr>
            ${orderedItems}
        </table>
        <table>
            <tr>
                It will be delivered to 
            </tr>
            <tr>
                ${name} 
            </tr>
            <tr>
                ${address} 
            </tr>
            <tr>
                ${city},${dist} 
            </tr>
            <tr>
                ${state},PinCode - ${pincode} 
            </tr>
        </table>

        Thank You for shopping with E-Mobile
    `
}

function orderFailure(userName,transactionId){
    return `
        <table>
            <tr>
                Dear ${userName},
            </tr>
            <tr>
                Sorry your ordered is unsuccessful.
            </tr>
            <tr>
                Your money will refund within 7 working days.
            </tr>
            <tr>
                Your transaction number is ${transactionId}.
            </tr>
        </table>
    `
}