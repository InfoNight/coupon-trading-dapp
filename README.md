# Coupon Trading App




------------------
CouponNFT.sol
 - erased registerStore (adds store accounts as minter)
 - for safe_mint & safe_transfer, IKIP17Receiver must be implemented, but only checked when the receiver is a contract. In our implementation, only personal accounts are receivers. Thus this does not matter.
