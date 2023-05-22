import stripe from "stripe";

const makePayments = async (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json({ success: false ,data:stripeErr});
        } else {
          res.status(200).json({ success: true, data: stripeRes });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false ,error});
  }
};

export default makePayments