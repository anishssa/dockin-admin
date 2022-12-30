
const UserRoleEnum = Object.freeze({USER: "user", OWNER: "owner", CAPTAIN: "captain"});

const PeriodEnum = Object.freeze({DAY : "day", WEEK : "week", MONTH : "month", YEAR : "year"});

const PriceEnum = Object.freeze({PERCENTAGE : 'percentage', AMOUNT : 'amount' });

const PeriodPriceEnum = Object.values(PeriodEnum).concat(Object.values(PriceEnum));

const DiscountEnum = Object.freeze({PERIOD :"period", PRICE :"price"});

const TripStatusEnum = Object.freeze({OPEN : "open", ON_GOING : "on_going", COMPLETED : "completed", CANCELLED : "cancelled"});

const SubscriptionStatusEnum = Object.freeze({OPEN : "open", TRIAL : "trial", ACTIVE : "active", INACTIVE : "inactive", EXPIRED : "expired", CANCELLED : "cancelled"});

const TransactionStatusEnum = Object.freeze({INPROGRESS : "inprogress", SUCCESS : "success", FAILURE : "failure", TIMEOUT : "timeout", VOID : "void"});

const TrackColorEnum = Object.freeze({RED : "red", GREEN : "green", BLUE : "blue", YELLOW : "yellow", ORANGE : "orange"});

const StoneTypeEnum = Object.freeze({ZERO : 0, ONE : 1, TWO : 2});

const UserAdminStoneStatusEnum = Object.freeze({UPDATED : "updated", DELETED : "deleted"});

const StatusEnum = Object.freeze({ACTIVE : true, INACTIVE : false});


// colors
const UserRoleColorEnum = Object.freeze({
    [UserRoleEnum.USER.toLowerCase()]: "#13c2c2",
    [UserRoleEnum.OWNER.toLowerCase()]: "#722ed1",
    [UserRoleEnum.CAPTAIN.toLowerCase()]: "#eb2f96"
});

const PeriodColorEnum = Object.freeze({
    [PeriodEnum.DAY.toLowerCase()]: "pink",
    [PeriodEnum.WEEK.toLowerCase()]: "purple",
    [PeriodEnum.MONTH.toLowerCase()]: "volcano",
    [PeriodEnum.YEAR.toLowerCase()]: "gold"
});

const PriceColorEnum = Object.freeze({
    [PriceEnum.PERCENTAGE.toLowerCase()]: "purple",
    [PriceEnum.AMOUNT.toLowerCase()]: "gold"
});

const PeriodPriceColorEnum = Object.assign({}, PeriodColorEnum, PriceColorEnum);

const DiscountColorEnum = Object.freeze({
    [DiscountEnum.PERIOD.toLowerCase()]: "yellow",
    [DiscountEnum.PRICE.toLowerCase()]: "orange"
});

const TripStatusColorEnum = Object.freeze({
    [TripStatusEnum.OPEN.toLowerCase()]: "geekblue",
    [TripStatusEnum.ON_GOING.toLowerCase()]: "magenta",
    [TripStatusEnum.COMPLETED.toLowerCase()]: "gold",
    [TripStatusEnum.CANCELLED.toLowerCase()]: "lime"
});

const SubscriptionStatusColorEnum = Object.freeze({
    [SubscriptionStatusEnum.OPEN.toLowerCase()]: "purple",
    [SubscriptionStatusEnum.TRIAL.toLowerCase()]: "magenta",
    [SubscriptionStatusEnum.ACTIVE.toLowerCase()]: "green",
    [SubscriptionStatusEnum.INACTIVE.toLowerCase()]: "red",
    [SubscriptionStatusEnum.EXPIRED.toLowerCase()]: "orange",
    [SubscriptionStatusEnum.CANCELLED.toLowerCase()]: "cyan"
});

const TransactionStatusColorEnum = Object.freeze({
    [TransactionStatusEnum.INPROGRESS.toLowerCase()]: "volcano",
    [TransactionStatusEnum.SUCCESS.toLowerCase()]: "green",
    [TransactionStatusEnum.FAILURE.toLowerCase()]: "red",
    [TransactionStatusEnum.TIMEOUT.toLowerCase()]: "cyan",
    [TransactionStatusEnum.VOID.toLowerCase()]: "red"
});

const StoneTypeColorEnum = Object.freeze({
    [StoneTypeEnum.ZERO]: "green",
    [StoneTypeEnum.ONE]: "blue",
    [StoneTypeEnum.TWO]: "purple"
});

const UserAdminStoneStatusColorEnum = Object.freeze({
    [UserAdminStoneStatusEnum.UPDATED.toLowerCase()]: "green",
    [UserAdminStoneStatusEnum.DELETED.toLowerCase()]: "red"

});

const StatusColors = {
    Active:'green',
    Inactive:'red',
    Expired : 'red',
    true:'green', //active
    false:'red', //inactive
    1:'green', //active
    0:'red', //inactive
    free : 'magenta',




    Pending:'pink',
    Processing:'volcano',
    Draft:'cyan',
    Completed:'green',
    Cancelled:'yellow',
    Deleted:'orange',
    Published:'blue',
    Unpublished:'purple',
    Unpaid:'geekblue',
    Paid:'magenta',
    Refunded:'gold',
    Failed:'lime',
}


export  {
    UserRoleEnum,
    PeriodEnum,
    PriceEnum,
    PeriodPriceEnum,
    DiscountEnum,
    TripStatusEnum,
    SubscriptionStatusEnum,
    TransactionStatusEnum,
    TrackColorEnum,
    StoneTypeEnum,
    UserAdminStoneStatusEnum,
    StatusEnum,

    UserRoleColorEnum,
    PeriodColorEnum,
    PriceColorEnum,
    PeriodPriceColorEnum,
    DiscountColorEnum,
    TripStatusColorEnum,
    SubscriptionStatusColorEnum,
    TransactionStatusColorEnum,
    StoneTypeColorEnum,
    UserAdminStoneStatusColorEnum,

    StatusColors

}


