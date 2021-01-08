import db from '../src/models';

class OrderService {

    static async index(customerId) {
        try {
            return await db.Order.findAll({
                where: {customerId},
                include: {
                    model: db.OrderItem,
                    include: db.Book
                }
            });
        } catch (e) {
            throw e;
        }
    }
/*
* "OrderItem",
{
orderId: DataTypes.INTEGER,
bookId: DataTypes.INTEGER,
price: DataTypes.REAL,
supplierPrice: DataTypes.REAL,
discount: DataTypes.REAL,

qty: {
  type: DataTypes.INTEGER,
  defaultValue: 1
  * "id": 8,
    "customerId": 1,
    "bookId": 3,
    "qty": 2,
}*/
    static async store(customerId, { deliveryDate, orderStatus, paymentType, voucherId, streetId, barangayId, municipalityId, supplierFee, note}) {
        try {
            const $order = await db.Order.create({ customerId, deliveryDate, orderStatus, paymentType, voucherId, streetId, barangayId, municipalityId, supplierFee, note});
            const $cart = await db.Cart.findAll({ where: {customerId},
                include: db.Book});
            let orderId = $order.id;
            let $arrCreate = [];

            $cart.map(({bookId, qty, Book}) => {
                let price = Book.price;
                let supplierPrice = Book.supplierPrice;
                $arrCreate = [...$arrCreate, {orderId, bookId, price, supplierPrice, qty}]
            });

            const $result = await db.OrderItem.bulkCreate($arrCreate);
            if ($result) {
                 await db.Cart.destroy({
                    where: {customerId}
                });
                return $order;
            }
            return [];
        } catch (e) {
            throw e;
        }
    }

    static async update(id, {params}) {
        try {
            const result = await db.Order.findOne({
                where: {id: Number(id)}
            });

            if (result) {
                const $result = await db.Order.update({
                    firstName: params.firstName,
                    middleName: params.middleName,
                    lastName: params.lastName,
                    contact_number: params.contact_number,
                    email: params.email,
                }, {where: {id: Number(id)}})
                console.log("result: ", $result);
                return $result;
            }
        } catch (e) {
            throw e;
        }
    }

    static async destroy(customerId, id) {
        try {
            return await db.Order.destroy({
                where: {
                    customerId,
                    id,
                }
            });
        } catch (e) {
            throw e;
        }
    }
}

export default OrderService;