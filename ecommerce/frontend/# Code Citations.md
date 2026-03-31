# Code Citations

## License: unknown
https://github.com/dubeymnthn/sandhara/blob/86d05540ad86fcf530c0235959bb4e5221303863/backend/controllers/ordercontrollers.js

```
{
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

/
```


## License: unknown
https://github.com/Niklastomas/mern-e-commerce/blob/e66034978976d5b5c5901730ee1d155cae566fed/backend/controllers/orderController.js

```
{
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

/
```

