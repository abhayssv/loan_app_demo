"use strict";
var db = require("../config/sequelize").db;
var Sequelize = require("sequelize");
var _ = require("lodash");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync"); 
var moment = require('moment');
const url = require('url');    
const { Op, QueryTypes } = require('sequelize');   
const jwt_decode = require('jwt-decode');

// Get Collection Team 

exports.getCollectionTeams = catchAsync(async (req, res, next) => { 
        let collectionTeams= [];
        const countCustomerLoan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                s1:0,
                customer_care:{[Op.ne]: 0}
            }
        }) 
        const countS1Loan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                s2:0,
                s1:{[Op.ne]: 0}
            }
        }) 
        const countS2Loan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                s3:0,
                s2:{[Op.ne]: 0}
            }
        }) 
        const countS3Loan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                m1:0,
                s3:{[Op.ne]: 0}
            }
        }) 
        const countM1Loan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                m2:0,
                m1:{[Op.ne]: 0}
            }
        }) 
        const countM2Loan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3,
                collection_manager:0,
                m2:{[Op.ne]: 0}
            }
        }) 
        const countCollectionManagerLoan = await db.models.appApplyLoan.count({
            include: [
                {
                  model: db.models.appUser,
                  as: 'appUser',
                  attributes: ['username', 'email', 'mobile_no'],
                  where:{ user_type: [0,1] }
                },  
            ],
            where:{
                deleted_at:null,
                status:3, 
                collection_manager:{[Op.ne]: 0}
            }
        })  
        collectionTeams.push(
            {
                id:7,
                name:"Customer Support",
                count :countCustomerLoan, 
            },
            {
                id:8,
                name:"S1",
                count :countS1Loan, 
            },
            {
                id:9,
                name:"S2",
                count :countS2Loan, 
            },
            {
                id:10,
                name:"S3",
                count :countS3Loan, 
            },
            {
                id:11,
                name:"M1",
                count :countM1Loan, 
            },
            {
                id:12,
                name:"M2",
                count :countM2Loan, 
            },
            {
                id:6,
                name:"Collection Manager",
                count :countCollectionManagerLoan, 
            } 
        );   
    if (!collectionTeams) return next(new AppError('Not Found', 404))
    res.json({ message: 'Collection team found', error: false, data: collectionTeams });
});

// Get Bussiness Collection Team
 
exports.getBusinessCollectionTeams = catchAsync(async (req, res, next) => { 
    let collectionTeams= [];
    const countCustomerLoan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            s1:0,
            customer_care:{[Op.ne]: 0}
        }
    }) 
    const countS1Loan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            s2:0,
            s1:{[Op.ne]: 0}
        }
    }) 
    const countS2Loan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            s3:0,
            s2:{[Op.ne]: 0}
        }
    }) 
    const countS3Loan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            m1:0,
            s3:{[Op.ne]: 0}
        }
    }) 
    const countM1Loan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            m2:0,
            m1:{[Op.ne]: 0}
        }
    }) 
    const countM2Loan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3,
            collection_manager:0,
            m2:{[Op.ne]: 0}
        }
    }) 
    const countCollectionManagerLoan = await db.models.appApplyLoan.count({
        include: [
            {
              model: db.models.appUser,
              as: 'appUser',
              attributes: ['username', 'email', 'mobile_no'],
              where:{ user_type: 2 }
            },  
        ],
        where:{
            deleted_at:null,
            status:3, 
            collection_manager:{[Op.ne]: 0}
        }
    })  
    collectionTeams.push(
        {
            id:7,
            name:"Customer Support",
            count :countCustomerLoan, 
        },
        {
            id:8,
            name:"S1",
            count :countS1Loan, 
        },
        {
            id:9,
            name:"S2",
            count :countS2Loan, 
        },
        {
            id:10,
            name:"S3",
            count :countS3Loan, 
        },
        {
            id:11,
            name:"M1",
            count :countM1Loan, 
        },
        {
            id:12,
            name:"M2",
            count :countM2Loan, 
        },
        {
            id:6,
            name:"Collection Manager",
            count :countCollectionManagerLoan, 
        } 
    );   
if (!collectionTeams) return next(new AppError('Not Found', 404))
res.json({ message: 'Collection team found', error: false, data: collectionTeams });
});
// Get Assigner list 

exports.getAssignerList = catchAsync(async (req, res, next) => { 
    const users = await db.models.user.findAll({
      attributes: ['id', 'firstname', 'lastname', "has_role"],
      where: {
        deleted_at: null, 
        user_type:3,
      }
    }) 
    let assignerList = [];
    for (const element of users) {
        let loanCount
        if(element.has_role == 7){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s1:0,
                    customer_care: element.id
                }
            })   
        }else if(element.has_role == 8){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s2:0,
                    s1: element.id
                }
            }) 
        }else if(element.has_role == 9){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s3:0,
                    s2: element.id
                }
            }) 
        }else if(element.has_role == 10){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    m1:0,
                    s3: element.id
                }
            }) 
        }else if(element.has_role == 11){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    m2:0,
                    m1: element.id
                }
            }) 
        }else if(element.has_role == 12){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    collection_manager:0,
                    m2: element.id
                }
            }) 
        }else{
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: [0,1] }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    collection_manager:{[Op.ne]: 0},
                    collection_manager: element.id
                }
            }) 
        }
        assignerList.push(
            { 
                id:element.id,
                name:element.firstname+" "+element.lastname,
                count :loanCount,  
            }
        );

    }
    if (!assignerList) return next(new AppError('Not Found', 404))
    res.json({ message: 'Assigner found', error: false, data: assignerList });
});

// Get Business Assigner List
exports.getBusinessAssignerList = catchAsync(async (req, res, next) => { 
    const users = await db.models.user.findAll({
      attributes: ['id', 'firstname', 'lastname', "has_role"],
      where: {
        deleted_at: null, 
        user_type:3,
      }
    }) 
    let assignerList = [];
    for (const element of users) {
        let loanCount
        if(element.has_role == 7){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s1:0,
                    customer_care: element.id
                }
            })   
        }else if(element.has_role == 8){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s2:0,
                    s1: element.id
                }
            }) 
        }else if(element.has_role == 9){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    s3:0,
                    s2: element.id
                }
            }) 
        }else if(element.has_role == 10){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    m1:0,
                    s3: element.id
                }
            }) 
        }else if(element.has_role == 11){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    m2:0,
                    m1: element.id
                }
            }) 
        }else if(element.has_role == 12){
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    collection_manager:0,
                    m2: element.id
                }
            }) 
        }else{
            loanCount = await db.models.appApplyLoan.count({
                include: [
                    {
                      model: db.models.appUser,
                      as: 'appUser',
                      attributes: ['username', 'email', 'mobile_no'],
                      where:{ user_type: 2 }
                    },  
                ],
                where:{
                    deleted_at:null,
                    status:3,
                    collection_manager:{[Op.ne]: 0},
                    collection_manager: element.id
                }
            }) 
        }
        assignerList.push(
            { 
                id:element.id,
                name:element.firstname+" "+element.lastname,
                count :loanCount,  
            }
        );

    }
    if (!assignerList) return next(new AppError('Not Found', 404))
    res.json({ message: 'Assigner found', error: false, data: assignerList });
});
// Get Reviewers

exports.getReviewers = catchAsync(async (req, res, next) => { 
    let reviewerList= [];
    var query = url.parse(req.url, true).query;  
    let first_status;
    let second_status;
    if(query.page == 'case_review'){ 
        first_status = [1,2];
        second_status = [3,5,6];
    } else if(query.page == 'overall_collection'){
        first_status = [0,2];
        second_status = [1,3,5,6];
    }else if (query.page == 'approval_report'){
        first_status = [1,2];
        second_status = [3,5]; 
    }else{
        first_status = 0;
        second_status = 1;
    }
    const countFirstReviewLoan = await db.models.appApplyLoan.count({
        where:{
            deleted_at:null,
            status:first_status, 
        }
    }) 
    const countSecondReviewLoan = await db.models.appApplyLoan.count({
        where:{
            deleted_at:null,
            status:second_status, 
        }
    })  
    reviewerList.push(
        {
            id:4,
            name:"First Review",
            count :countFirstReviewLoan, 
        },
        {
            id:5,
            name:"Second Review",
            count :countSecondReviewLoan, 
        }
    );   
if (!reviewerList) return next(new AppError('Not Found', 404))
res.json({ message: 'Collection team found', error: false, data: reviewerList });
});

// Get Reviewer Assigner  

exports.getReviewerAssigner = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query;  
    let first_status;
    let second_status;
    if(query.page == 'case_review'){ 
        first_status = [1,2];
        second_status = [3,5,6];
    } else if(query.page == 'overall_collection'){
        first_status = [0,2];
        second_status = [1,3,5,6];
    }else if (query.page == 'approval_report'){
        first_status = [1,2];
        second_status = [3,5]; 
    }else{
        first_status = 0;
        second_status = 1;
    }
    
    const users = await db.models.user.findAll({
      attributes: ['id', 'firstname', 'lastname', "has_role"],
      where: {
        deleted_at: null, 
        user_type:2, 
        has_role:[4,5]
      }
    })  
    let assignerList = [];
    for (const element of users) { 
        let loanCount
        if(element.has_role == 4){ 
            loanCount = await db.models.appApplyLoan.count({
                where:{
                    deleted_at:null,
                    status:first_status, 
                    reviewer_1: element.id
                }
            })   
        }else{ 
            loanCount = await db.models.appApplyLoan.count({
                where:{
                    deleted_at:null,
                    status:second_status, 
                    reviewer_2: element.id
                }
            }) 
        }  
        assignerList.push(
            { 
                id:element.id,
                name:element.firstname+" "+element.lastname,
                count :loanCount,  
            }
        );

    }
    if (!assignerList) return next(new AppError('Not Found', 404))
    res.json({ message: 'Assigner found', error: false, data: assignerList });
});

// Search Overall Collection Loan

exports.getSearchOverallCollection = catchAsync(async (req, res, next) => { 
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;  
    const query = url.parse(req.url, true).query; 
    const {loan_id, email, mobile_no, amount, assigned, collection_team, from_date, to_date, id_number, name, overdue_days, tenure, user_type } = query;
    const assign = assigned == "undefined" ? "" : assigned;
    const collection_teams = assigned == "undefined" ? "" : collection_team; 
    let whereAssigner;
    let whereCollectionTeam;
    let p_Date;
    console.log("Has Role", has_role);
    if(assign != ''){ 
        const users = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assign
            }
        }); 
        if(users.has_role == 7){  
            whereAssigner = { 
                deleted_at:null,    
                status:3,
                s1:0,
                customer_care: assign
            } 
        } else if(users.has_role == 8){  
            whereAssigner={
                deleted_at:null,
                status:3,
                s2:0,
                s1: assign
            }  
        }else if(users.has_role == 9){
            whereAssigner={
                deleted_at:null,
                status:3,
                s3:0,
                s2: assign
            }  
        }else if(users.has_role == 10){
            whereAssigner={
                deleted_at:null,
                status:3,
                m1:0,
                s3: assign
            }  
        }else if(users.has_role == 11){
            whereAssigner={
                deleted_at:null,
                status:3,
                m2:0,
                m1: assign
            }  
        }else if(users.has_role == 12){
            whereAssigner={
                deleted_at:null,
                status:3,
                collection_manager:0,
                m2: assign
            }  
        }else{
            whereAssigner={
                deleted_at:null,
                status:3,
                collection_manager:{[Op.ne]: 0},
                collection_manager: assign
            }  
        } 
    } 
    if(collection_teams != ''){ 
        if(collection_teams == 7){
            whereCollectionTeam   = { 
                deleted_at:null,    
                status:3,
                s1:0,
                customer_care:{[Op.ne]: 0}
            } 
        } else if(collection_teams == 8){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                s2:0,
                s1: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 9){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                s3:0,
                s2: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 10){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                m1:0,
                s3: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 11){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                m2:0,
                m1: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 12){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                collection_manager:0,
                m2: {[Op.ne]: 0}
            }  
        }else{
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                collection_manager:{[Op.ne]: 0}, 
            }  
        } 
    } 
    if(overdue_days != ""){
        p_Date = moment().subtract(overdue_days, "d").format("YYYY-MM-DD");
    } 
    let whereClause; 
    let whereClause2;
    let whereClause3;
    if(from_date != "" && to_date != ""){    
        if(has_role == 7){   
            console.log(7777777777777777777777777777);
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s1:0,
                }
            } else if(name != ""){   
                whereClause2 = {
                    username:name,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    customer_care:user_id,
                    days:tenure,
                    required_amount:amount,
                    s1:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                } 
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s1:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s1:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }
        } else if(has_role == 8){
            console.log(888888888888888888888888888888);   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s2:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:user_id,
                    days:tenure,
                    required_amount:amount,
                    s2:0,
                } 
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s2:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s2:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }
        } else if(has_role == 9){   
            console.log(999999999999999999999999);
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s3:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:user_id,
                    days:tenure,
                    required_amount:amount,
                    s3:0,
                } 
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s3:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s3:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }
        } else if(has_role == 10){  
            console.log(100000000000000000000000000);  
            if(loan_id != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    m1:0,
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(mobile_no != ""){   
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            }else if(tenure != "" && amount != ""){   
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:user_id,
                    days:tenure,
                    required_amount:amount,
                    m1:0,
                } 
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    m1:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    m1:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }
        } else if(has_role == 11){ 
            console.log(11111111111111111111);  
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    m2:0,
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: [0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:user_id,
                    days:tenure,
                    required_amount:amount,
                    m2:0,
                } 
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    m2:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    m2:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }
        } else if(has_role == 12){  
            console.log(12222222222222222222222); 
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    collection_manager:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:user_id,
                    days:tenure,
                    required_amount:amount,
                    collection_manager:0,
                } 
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    collection_manager:0, 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(amount != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    collection_manager:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else if(overdue_days != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    collection_manager:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    collection_manager:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            }  
        } else if(has_role == 6){     
            console.log(66666666666666666666666666666);      
            // if(loan_id != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,
            //         loan_id:loan_id,  
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } else if(name != ""){  
            //     whereClause2 = {
            //         username:name,
            //         user_type: [0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3, 
            //     }
            // } else if(mobile_no != ""){ 
            //     whereClause2 = {
            //         mobile_no:mobile_no,
            //         user_type: [0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,  
            //     }
            // } else if(email != ""){  
            //     whereClause2 = {
            //         email:email,
            //         user_type: [0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,  
            //     }
            // } else if(id_number != ""){  
            //     whereClause3 = {
            //         adhaar_no: id_number
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,  
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } else if(user_type != ""){  
            //     whereClause2 = {
            //         user_type: user_type
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,  
            //     }
            // } else if(tenure != "" && amount != ""){ 
            //     whereClause = { 
            //         deleted_at:null, 
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,
            //         collection_manager:user_id,
            //         days:tenure,
            //         required_amount:amount, 
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     } 
            // } else if(tenure != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3,
            //         days:tenure, 
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } else if(amount != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3, 
            //         required_amount:amount 
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } else if(overdue_days != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         },  
            //         status:3, 
            //         payable_date: { 
            //             [Op.gte]: p_Date + " 00:00:00",
            //             [Op.lte]: p_Date + " 23:59:59"
            //         },  
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } else{   
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         apply_date: { 
            //             [Op.gte]: from_date + " 00:00:00",
            //             [Op.lte]: to_date + " 23:59:59"
            //         }, 
            //         status:3  
            //     }
            //     whereClause2 = { 
            //         user_type: [0,1]
            //     }
            // } 
            
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(name != ""){
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(mobile_no != ""){
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            } else if(email != ""){
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(id_number != ""){
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(tenure != "" && amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    required_amount:amount 
                }  
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(overdue_days != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(assign != ''){
                whereClause = whereAssigner
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else{
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        }else{ 
            console.log("ADDDDDDDDDDDDDDDDDDDDD"); 
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id 
                }
                whereClause2 = { 
                    user_type: [0,1]
                }
            } else if(name != ""){
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(mobile_no != ""){
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            } else if(email != ""){
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(id_number != ""){
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(tenure != "" && amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    required_amount:amount 
                }  
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(overdue_days != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(assign != ''){
                whereClause = whereAssigner
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else{
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } 
        } 
    }else {  
        if(has_role == 7){    
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s1:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){   
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    customer_care:user_id,
                    days:tenure,
                    required_amount:amount,
                    s1:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    days:tenure,
                    s1:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    s1:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    s1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    s1:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        } else if(has_role == 8){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s2:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s1:user_id,
                    days:tenure,
                    required_amount:amount,
                    s2:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    days:tenure,
                    s2:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    s2:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    s2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    s2:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        } else if(has_role == 9){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s3:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s2:user_id,
                    days:tenure,
                    required_amount:amount,
                    s3:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    days:tenure,
                    s3:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    s3:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    s3:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    s3:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        } else if(has_role == 10){    
            if(loan_id != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    m1:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(mobile_no != ""){   
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            }else if(tenure != "" && amount != ""){   
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s3:user_id,
                    days:tenure,
                    required_amount:amount,
                    m1:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    days:tenure,
                    m1:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    m1:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    m1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    m1:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        } else if(has_role == 11){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    m2:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    m1:user_id,
                    days:tenure,
                    required_amount:amount,
                    m2:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    days:tenure,
                    m2:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    m2:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    m2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    m2:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }
        } else if(has_role == 12){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    collection_manager:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    m2:user_id,
                    days:tenure,
                    required_amount:amount,
                    collection_manager:0,
                } 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    days:tenure,
                    collection_manager:0, 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(amount != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    collection_manager:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else if(overdue_days != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    collection_manager:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    collection_manager:0,
                    status:3  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            }  
        } else if(has_role == 6){     
            // if(loan_id != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,
            //         loan_id:loan_id,  
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else if(name != ""){  
            //     whereClause2 = {
            //         username:name,
            //         user_type:[0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3, 
            //     }
            // } else if(mobile_no != ""){ 
            //     whereClause2 = {
            //         mobile_no:mobile_no,
            //         user_type:[0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,  
            //     }
            // } else if(email != ""){  
            //     whereClause2 = {
            //         email:email,
            //         user_type:[0,1]
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,  
            //     }
            // } else if(id_number != ""){  
            //     whereClause3 = {
            //         adhaar_no: id_number
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,  
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else if(user_type != ""){  
            //     whereClause2 = {
            //         user_type: user_type
            //     }
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,  
            //     }
            // } else if(tenure != "" && amount != ""){ 
            //     whereClause = { 
            //         deleted_at:null,  
            //         status:3,
            //         collection_manager:user_id,
            //         days:tenure,
            //         required_amount:amount, 
            //     } 
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else if(tenure != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3,
            //         days:tenure, 
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else if(amount != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3, 
            //         required_amount:amount 
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else if(overdue_days != ""){  
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id, 
            //         status:3, 
            //         payable_date: { 
            //             [Op.gte]: p_Date + " 00:00:00",
            //             [Op.lte]: p_Date + " 23:59:59"
            //         },  
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // } else{   
            //     whereClause = { 
            //         deleted_at:null,
            //         collection_manager:user_id,
            //         status:3  
            //     }
            //     whereClause2 = {
            //         user_type:[0,1]
            //     }
            // }
            console.log(141414);       
            if(loan_id != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    loan_id:loan_id,  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}   
                    
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0},
                    days:tenure,
                    required_amount:amount 
                } 
                whereClause2 = {
                    user_type:[0,1]
                } 
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    days:tenure,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    required_amount:amount,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(assign != ''){ 
                whereClause = whereAssigner
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else{
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } 
        }else{
            if(loan_id != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    loan_id:loan_id,  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}   
                    
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:[0,1]
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0},
                    days:tenure,
                    required_amount:amount 
                } 
                whereClause2 = {
                    user_type:[0,1]
                } 
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    days:tenure,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    required_amount:amount,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(assign != ''){ 
                whereClause = whereAssigner
                whereClause2 = {
                    user_type:[0,1]
                }
            } else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type:[0,1]
                }
            } else{
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type:[0,1]
                }
            } 
        } 
    } 
    console.log("WhereClause1", whereClause);
    console.log("WhereClause2", whereClause2);
    console.log("WhereClause3", whereClause3);
    const applyloan = await db.models.appApplyLoan.findAll({
        include: [{
           model: db.models.appUser, 
           attributes: ['username', 'email','mobile_no','user_type'],
           where:whereClause2
        },
        {
            model: db.models.loanRemark, 
            attributes: ['user_id','remarks'], 
            include: [{
                model: db.models.user, 
                attributes: ['firstname', 'lastname'],
            }], 
        }, 
        {
           model: db.models.user,
           as: 'appUserReviewer_1', 
           attributes: ['firstname', 'lastname'],
        }, 
        {
           model: db.models.loanStatus, 
           attributes: ['status_id', 'status'],
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
            where: whereClause3 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
            order: [["id", "DESC"]],
            where: whereClause 
        }) 
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError("Not Found", 404)); 
    const applyLoans = [];  
    for (const element of applyloan) { 
        let response = [];
        if(element.loanRemarks.length > 0){ 
            const arry = element.loanRemarks  
            const lastElement = arry[arry.length - 1];  
            response = {
                'username': lastElement.user.firstname + ' ' +  lastElement.user.lastname,
                'remarks': lastElement.remarks[Object.keys(lastElement.remarks).length -1]
            };
        }
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status:4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });  
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        } 
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            remaining_amount: element.remaining_amount,
            assigned: element.appUser.username,
            apply_date:element.apply_date,
            disbursed_date:element.disbursed_date,
            days:element.days,
            payable_date:element.payable_date,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2, 
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].s1 != 0 ? "OD":"",
            customerExtend:users[0].status == 8 ? "EXT":"",
            remark: _.isEmpty(response) == false ? response.remarks.remark: "No Remark",
            remarkDate: _.isEmpty(response) == false ? response.remarks.remark_submitted_date: "No Remark",
            remarker:  _.isEmpty(response) == false ? response.username : "No Remark",
            customer_care: element.customer_care,
            s1: element.s1,
            s2: element.s2,
            s3: element.s3,
            m1: element.m1,
            m2: element.m2,
            collection_manager: element.collection_manager, 
        })   
    };
    res.json({ message: "Apply Loan found", error: false, data: applyLoans });
});

// Search Overall Business Collection Loan

exports.getSearchOverallBusinessCollection = catchAsync(async (req, res, next) => { 
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;  
    const query = url.parse(req.url, true).query; 
    const {loan_id, email, mobile_no, amount, assigned, collection_team, from_date, to_date, id_number, name, overdue_days, tenure, user_type } = query;
    const assign = assigned == "undefined" ? "" : assigned;
    const collection_teams = assigned == "undefined" ? "" : collection_team;
    let whereAssigner;
    let whereCollectionTeam;
    let p_Date;
    if(assign != ''){ 
        const users = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assign
            }
        }); 
        if(users.has_role == 7){ 
            whereAssigner = { 
                deleted_at:null,    
                status:3,
                s1:0,
                customer_care: assign
            } 
        } else if(users.has_role == 8){ 
            whereAssigner={
                deleted_at:null,
                status:3,
                s2:0,
                s1: assign
            }  
        }else if(users.has_role == 9){ 
            whereAssigner={
                deleted_at:null,
                status:3,
                s3:0,
                s2: assign
            }  
        }else if(users.has_role == 10){ 
            whereAssigner={
                deleted_at:null,
                status:3,
                m1:0,
                s3: assign
            }  
        }else if(users.has_role == 11){ 
            whereAssigner={
                deleted_at:null,
                status:3,
                m2:0,
                m1: assign
            }  
        }else if(users.has_role == 12){ 
            whereAssigner={
                deleted_at:null,
                status:3,
                collection_manager:0,
                m2: assign
            }  
        }else{ 
            whereAssigner={
                deleted_at:null,
                status:3,
                collection_manager:{[Op.ne]: 0},
                collection_manager: assign
            }  
        } 
    }
    if(collection_teams != ''){ 
        if(collection_teams == 7){
            whereCollectionTeam   = { 
                deleted_at:null,    
                status:3,
                s1:0,
                customer_care:{[Op.ne]: 0}
            } 
        } else if(collection_teams == 8){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                s2:0,
                s1: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 9){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                s3:0,
                s2: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 10){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                m1:0,
                s3: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 11){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                m2:0,
                m1: {[Op.ne]: 0}
            }  
        }else if(collection_teams == 12){
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                collection_manager:0,
                m2: {[Op.ne]: 0}
            }  
        }else{
            whereCollectionTeam = {
                deleted_at:null,
                status:3,
                collection_manager:{[Op.ne]: 0}, 
            }  
        } 
    } 
    if(overdue_days != ""){
        p_Date = moment().subtract(overdue_days, "d").format("YYYY-MM-DD");
    } 
    let whereClause; 
    let whereClause2;
    let whereClause3;
    if(from_date != "" && to_date != ""){    
        if(has_role == 7){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s1:0,
                }
            } else if(name != ""){   
                whereClause2 = {
                    username:name,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s1:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    customer_care:user_id,
                    days:tenure,
                    required_amount:amount,
                    s1:0,
                }
                whereClause2 = { 
                    user_type:  2
                } 
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s1:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s1:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }
        } else if(has_role == 8){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s2:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s2:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s1:user_id,
                    days:tenure,
                    required_amount:amount,
                    s2:0,
                } 
                whereClause2 = { 
                    user_type:  2
                }
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s2:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s2:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }
        } else if(has_role == 9){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    s3:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    s3:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s2:user_id,
                    days:tenure,
                    required_amount:amount,
                    s3:0,
                } 
                whereClause2 = { 
                    user_type:  2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    s3:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    s3:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }
        } else if(has_role == 10){    
            if(loan_id != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    m1:0,
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(mobile_no != ""){   
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m1:0,
                }
            }else if(tenure != "" && amount != ""){   
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    s3:user_id,
                    days:tenure,
                    required_amount:amount,
                    m1:0,
                } 
                whereClause2 = { 
                    user_type:  2
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    m1:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    m1:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }
        } else if(has_role == 11){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    m2:0,
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    m2:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m1:user_id,
                    days:tenure,
                    required_amount:amount,
                    m2:0,
                } 
                whereClause2 = { 
                    user_type:  2
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    m2:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    m2:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }
        } else if(has_role == 12){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id, 
                    collection_manager:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    collection_manager:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    m2:user_id,
                    days:tenure,
                    required_amount:amount,
                    collection_manager:0,
                } 
                whereClause2 = { 
                    user_type:  2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    collection_manager:0, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    collection_manager:0,
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    collection_manager:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
                    collection_manager:0,
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }  
        } else if(has_role == 6){     
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id,  
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type:  2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    collection_manager:user_id,
                    days:tenure,
                    required_amount:amount, 
                }
                whereClause2 = { 
                    user_type:  2
                } 
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure, 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    required_amount:amount 
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    }, 
                    status:3  
                }
                whereClause2 = { 
                    user_type:  2
                }
            }       
        }else{  
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    loan_id:loan_id 
                }
                whereClause2 = { 
                    user_type:  2
                }
            } else if(name != ""){
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(mobile_no != ""){
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,  
                }
            } else if(email != ""){
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            } else if(id_number != ""){
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3, 
                }
            }else if(tenure != "" && amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure,
                    required_amount:amount 
                }  
                whereClause2 = {
                    user_type: 2
                }
            }else if(tenure != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    days:tenure 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(assign != ''){
                whereClause = whereAssigner
                whereClause2 = {
                    user_type: 2
                }
            }else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type: 2
                }
            }else{
                whereClause = { 
                    deleted_at:null, 
                    apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },  
                    status:3 
                }
                whereClause2 = {
                    user_type: 2
                }
            } 
        } 
    }else {  
        if(has_role == 7){    
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s1:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){   
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3, 
                    s1:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    customer_care:user_id,
                    days:tenure,
                    required_amount:amount,
                    s1:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    days:tenure,
                    s1:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    s1:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,  
                    status:3,
                    s1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    customer_care:user_id,
                    s1:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }
        } else if(has_role == 8){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s2:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(email != ""){ 
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3, 
                    s2:0,
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s1:user_id,
                    days:tenure,
                    required_amount:amount,
                    s2:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    days:tenure,
                    s2:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    s2:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,  
                    status:3,
                    s2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s1:user_id,
                    s2:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }
        } else if(has_role == 9){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    s3:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            } else if(id_number != ""){   
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3, 
                    s3:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s2:user_id,
                    days:tenure,
                    required_amount:amount,
                    s3:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    days:tenure,
                    s3:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    s3:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,  
                    status:3,
                    s3:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s2:user_id,
                    s3:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }
        } else if(has_role == 10){    
            if(loan_id != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    m1:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(mobile_no != ""){   
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3, 
                    m1:0,
                }
            }else if(tenure != "" && amount != ""){   
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    s3:user_id,
                    days:tenure,
                    required_amount:amount,
                    m1:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    days:tenure,
                    m1:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    m1:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,  
                    status:3,
                    m1:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    s3:user_id,
                    m1:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }
        } else if(has_role == 11){   
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    m2:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(email != ""){   
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3, 
                    m2:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    m1:user_id,
                    days:tenure,
                    required_amount:amount,
                    m2:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    days:tenure,
                    m2:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    m2:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,  
                    status:3,
                    m2:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m1:user_id,
                    m2:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }
        } else if(has_role == 12){   
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    loan_id:loan_id, 
                    collection_manager:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){ 
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(mobile_no != ""){  
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            } else if(id_number != ""){ 
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){ 
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3, 
                    collection_manager:0,
                }
            }else if(tenure != "" && amount != ""){  
                whereClause = { 
                    deleted_at:null,   
                    status:3,
                    m2:user_id,
                    days:tenure,
                    required_amount:amount,
                    collection_manager:0,
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    days:tenure,
                    collection_manager:0, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    collection_manager:0,
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,  
                    status:3,
                    collection_manager:0,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    m2:user_id,
                    collection_manager:0,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }  
        } else if(has_role == 6){     
            if(loan_id != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,
                    loan_id:loan_id,  
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){  
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3, 
                }
            } else if(mobile_no != ""){ 
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,  
                }
            } else if(email != ""){  
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,  
                }
            } else if(id_number != ""){  
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,  
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){  
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,  
                }
            }else if(tenure != "" && amount != ""){ 
                whereClause = { 
                    deleted_at:null,  
                    status:3,
                    collection_manager:user_id,
                    days:tenure,
                    required_amount:amount, 
                } 
                whereClause2 = {
                    user_type: 2
                }
            } else if(tenure != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3,
                    days:tenure, 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3, 
                    required_amount:amount 
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){  
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id, 
                    status:3, 
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else{   
                whereClause = { 
                    deleted_at:null,
                    collection_manager:user_id,
                    status:3  
                }
                whereClause2 = {
                    user_type: 2
                }
            }       
        }else{  
            if(loan_id != ""){ 
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    loan_id:loan_id,  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(name != ""){
                whereClause2 = {
                    username:name,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(mobile_no != ""){
                whereClause2 = {
                    mobile_no:mobile_no,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}   
                    
                }
            } else if(email != ""){
                whereClause2 = {
                    email:email,
                    user_type: 2
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            } else if(id_number != ""){
                whereClause3 = {
                    adhaar_no: id_number
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type: 2
                }
            } else if(user_type != ""){
                whereClause2 = {
                    user_type: user_type
                }
                whereClause = { 
                    deleted_at:null, 
                    status:3, 
                    customer_care: {[Op.ne]: 0}  
                }
            }else if(tenure != "" && amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0},
                    days:tenure,
                    required_amount:amount 
                } 
                whereClause2 = {
                    user_type: 2
                } 
            }else if(tenure != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    days:tenure,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(amount != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    required_amount:amount,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(overdue_days != ""){
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    payable_date: { 
                        [Op.gte]: p_Date + " 00:00:00",
                        [Op.lte]: p_Date + " 23:59:59"
                    },  
                    customer_care: {[Op.ne]: 0}  
                }
                whereClause2 = {
                    user_type: 2
                }
            }else if(assign != ''){
                whereClause = whereAssigner
                whereClause2 = {
                    user_type: 2
                }
            }else if(collection_teams != ''){
                whereClause = whereCollectionTeam 
                whereClause2 = {
                    user_type: 2
                }
            }else{
                whereClause = { 
                    deleted_at:null, 
                    status:3,
                    customer_care: {[Op.ne]: 0}   
                }
                whereClause2 = {
                    user_type: 2
                }
            } 
        } 
    }   
    const applyloan = await db.models.appApplyLoan.findAll({
        include: [{
           model: db.models.appUser, 
           attributes: ['username', 'email','mobile_no','user_type'],
           where:whereClause2
        },
        {
            model: db.models.loanRemark, 
            attributes: ['user_id','remarks'], 
            include: [{
                model: db.models.user, 
                attributes: ['firstname', 'lastname'],
            }], 
        }, 
        {
           model: db.models.user,
           as: 'appUserReviewer_1', 
           attributes: ['firstname', 'lastname'],
        }, 
        {
           model: db.models.loanStatus, 
           attributes: ['status_id', 'status'],
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
            where: whereClause3 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
            order: [["id", "DESC"]],
            where: whereClause 
        }) 
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError("Not Found", 404)); 
    const applyLoans = [];  
    for (const element of applyloan) { 
        let response = [];
        if(element.loanRemarks.length > 0){ 
            const arry = element.loanRemarks  
            const lastElement = arry[arry.length - 1];  
            response = {
                'username': lastElement.user.firstname + ' ' +  lastElement.user.lastname,
                'remarks': lastElement.remarks[Object.keys(lastElement.remarks).length -1]
            };
        }
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status:4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });  
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        } 
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            remaining_amount: element.remaining_amount,
            assigned: element.appUser.username,
            apply_date:element.apply_date,
            disbursed_date:element.disbursed_date,
            days:element.days,
            payable_date:element.payable_date,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2, 
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].s1 != 0 ? "OD":"",
            customerExtend:users[0].status == 8 ? "EXT":"",
            remark: _.isEmpty(response) == false ? response.remarks.remark: "No Remark",
            remarkDate: _.isEmpty(response) == false ? response.remarks.remark_submitted_date: "No Remark",
            remarker:  _.isEmpty(response) == false ? response.username : "No Remark",
            customer_care: element.customer_care,
            s1: element.s1,
            s2: element.s2,
            s3: element.s3,
            m1: element.m1,
            m2: element.m2,
            collection_manager: element.collection_manager, 
        })   
    };
    res.json({ message: "Apply Loan found", error: false, data: applyLoans });
});
 
// Get Reviewer Loans

exports.getReviewerLoans = catchAsync(async (req, res, next) => { 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'customerCare', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S3', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'collectionManager', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.loanStatus, 
              attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: {
            deleted_at:null, 
            customer_care:0,
            status:[0,1,2,3,4,5,]
        },
    });

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

// Get Reviewer Loans by Pegination

exports.getReviewerLoansReport = catchAsync(async (req, res, next) => { 
    const {offset, limit} = req.params; 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'customerCare', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S3', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'collectionManager', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.loanStatus, 
              attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]], 
        limit: parseInt(limit),
        offset: parseInt(offset), 
        where: {
            deleted_at:null, 
            customer_care:0
        },
    });
    const countLoan = await db.models.appApplyLoan.count({
        where: {
            deleted_at:null,
            customer_care:0
        }  
    }) 

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));

    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
        total: countLoan
    });
});

// Get Collection Loans

exports.getCollectionLoans = catchAsync(async (req, res, next) => { 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'customerCare', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S3', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'collectionManager', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.loanStatus, 
              attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: {
            deleted_at:null, 
            customer_care:{[Op.ne]: 0}
        },
    });

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

// Get Reviewer Loans by Pegination

exports.getCollectionLoansReport = catchAsync(async (req, res, next) => { 
    const {offset, limit} = req.params; 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'appUserReviewer_2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'customerCare', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'S3', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M1', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'M2', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.user,
              as: 'collectionManager', 
              attributes: ['firstname', 'lastname'],
            },
            {
              model: db.models.loanStatus, 
              attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]], 
        limit: parseInt(limit),
        offset: parseInt(offset), 
        where: {
            deleted_at:null, 
            customer_care:{[Op.ne]: 0}
        },
    });
    const countLoan = await db.models.appApplyLoan.count({
        where: {
            deleted_at:null, 
            customer_care:{[Op.ne]: 0}
        }, 
    }) 

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
        total: countLoan
    });
});

// Get Status and User Id 

exports.getAllStatusByReviewer = catchAsync(async (req, res, next) => {
    const { reviewer_id } = req.params; 
    let team;
    let status_id; 
    let user_type;
    let has_role;
    switch (parseInt(reviewer_id)) { 
        case 4:
            team = "First Reviewer";  
            status_id = [0,1,2];
            user_type = 2;
            has_role = 4;  
          break;
        case 5:
            team = "Second Reviewer";  
            status_id = [3,5,4];   
            user_type = 2;
            has_role = 5;
          break;        
    } 
    const status = await db.models.loanStatus.findAll({ 
      attributes: [
        'id','status_id', 'status'
      ], 
      where: {
        status_id: status_id
      }
    });
    const users = await db.models.user.findAll({ 
        attributes: [
          'id', 'firstname', 'lastname'
        ], 
        where: {
          deleted_at:null,
          user_type: user_type,
          has_role: has_role
        }
    });
    if (!status) return next(new AppError("Not Found", 404));
    res.json({
        message: "Status",
        error: false,
        data: status,
        users: users
    });
}); 

// Get Reviewer Reports Loan

exports.getReviewerReports = catchAsync(async (req, res, next) => { 
    const query = url.parse(req.url, true).query; 
    const {from_date, to_date, reviewer, status, assigned_users, loan_id, name, mobile_no, email, user_type, tenure, amount, id_number, offset, limit, isExport} = query;
    
    let  user = {}
    let  reviewers = {}

    if(assigned_users != ""){ 
        user = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assigned_users
            }
        });
    }


    if(reviewer != ""){ 
    reviewers = await db.models.user.findAll({
        attributes: ['id'],
        where: {
          deleted_at: null, 
          has_role:reviewer
        }
    });
    }

    let whereClause = { deleted_at:null }; 
    let whereClause2 = {};
    let whereClause3 = {};

    if(from_date !== '') {
      whereClause['apply_date'] = { [Op.gte]: `${from_date} 00:00:00`};
    }

    if(user.has_role == 4) { 
      whereClause['status'] = 0;
      whereClause['reviewer_1']  = assigned_users;
    } 

    if (user.has_role == 5){ 
      whereClause['status'] = 1;
      whereClause['reviewer_2']  = assigned_users;
    } 



    if(to_date !== '') {
      whereClause['apply_date'] = { [Op.lte] : `${to_date} 23:59:59`};
    }

    if(from_date !== '' && to_date !== '') {
      whereClause['apply_date'] = { 
                                    [Op.gte]: `${from_date} 00:00:00`,
                                    [Op.lte] : `${to_date} 23:59:59`
                                  };
    }

    if(reviewer !== '') {
      const reviewCol = reviewer == 4 ? 'reviewer_1' : 'reviewer_2';
      whereClause[reviewCol] =  { [Op.in]: [reviewers.map(c=>c.id)] };
    }

    if (tenure !== '') {
      whereClause['days'] = tenure;    
    }

    if (amount !== '') {
    whereClause['required_amount'] = amount;
    }

    if (loan_id !== '') {
      whereClause['loan_id'] = loan_id; 
    }

    if (status !== '') {
      whereClause['status'] = status; 
    }


    if (name !== '') {
      whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no !== '') {
      whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type !== '') {
      whereClause2['user_type'] = user_type;
    }

    if (email !== '') {
      whereClause2['email'] = email; 
    }

    if (id_number !== '') {
      whereClause3['adhaar_no'] = id_number; 
    }

    const queryObject = {
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no','user_type'],
        where: whereClause2
      },
      {
        model: db.models.user,
        as: 'appUserReviewer_1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'appUserReviewer_2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'customerCare', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S3', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'M1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'M2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'collectionManager', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.loanStatus, 
        attributes: ['status_id', 'status'],
      },
      {      
        model: db.models.appKycDetails, 
        attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
        where: whereClause3 
      } 
    ],
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
      order: [["id", "DESC"]],
      where: whereClause 
    }

    const applyLoanTotalCount = await db.models.appApplyLoan.count(queryObject); 

    if(!isExport) {
     queryObject['offset'] = Number(offset);
     queryObject['limit'] = Number(limit);  
    }

    const applyloan = await db.models.appApplyLoan.findAll(queryObject); 

    res.json({ message: 'Reviewer Record found', error: false, data: applyloan, total: applyLoanTotalCount });
  }) 

// Get User Id   

  exports.getAllUserByCollectionId = catchAsync(async (req, res, next) => { 
    const { collection_id } = req.params; 
    let team;
    let user_type;
    let has_role; 
    switch (parseInt(collection_id)) { 
        case 4: 
            team = "First Reviewer";
            user_type = 2;
            has_role = 4;
          break;
        case 5: 
            team = "Second Reviewer";
            user_type = 2;
            has_role = 5;
          break;
        case 6: 
            team = "Collection Manager";
            user_type = 3;
            has_role = 6;
          break;
        case 7:
            team = "Customer Support";
            user_type = 3;
            has_role = 7;
          break; 
        case 8:
            team = "S1";
            user_type = 3;
            has_role = 8;  
          break;
        case 9: 
            team = "S2";
            user_type = 3;
            has_role = 9;
          break;
        case 10:
            team = "S3";
            user_type = 3;
            has_role = 10;
          break;
        case 11:
            team = "M1";
            user_type = 3;
            has_role = 11;
          break;
        case 12:
            team = "M2";
            user_type = 3;
            has_role = 12;
          break; 
    }  
    const users = await db.models.user.findAll({ 
      attributes: [
        'id', 'firstname', 'lastname'
      ], 
      where: {
        deleted_at:null,
        user_type: user_type,
        has_role: has_role
      }
    }); 
    if (!users) return next(new AppError("Not Found", 404));
    res.json({
        message: "Users",
        error: false,
        data: users,
    });
});

// Get Collection Reports Loan

exports.getCollectionReports = catchAsync(async (req, res, next) => { 
    const query = url.parse(req.url, true).query;
    const {from_date, to_date, collection_team, assigned_users, loan_id, name, mobile_no, email, amount, id_number, tenure, user_type, limit, offset, isExport } = query; 
    
    let whereClause = { deleted_at:null, status: { [Op.in]: [3,4,8]} }; 
    let whereClause2 = {};
    let whereClause3 = {};
    let collectionTeams = {
        6: 'collection_manager',
        7: 'customer_care',
        8: 's1',
        9: 's2',
        10: 's3',
        11: 'm1',
        12: 'm2',
    }
    let collectionKey = collectionTeams[collection_team]



    if(from_date !== '') {
      whereClause['apply_date'] = { [Op.gte]: `${from_date} 00:00:00`};
    }

    if(to_date !== '') {
      whereClause['apply_date'] = { [Op.lte] : `${to_date} 23:59:59`};
    }

    if(to_date !== '' && from_date !== '') {
      whereClause['apply_date'] = { 
                                      [Op.gte]: `${from_date} 00:00:00`,
                                      [Op.lt] : `${to_date} 23:59:59`
                                  };
    }

    if (collection_team !== '') {
      whereClause[collectionKey] = {[Op.ne]: 0}
    }

    if (assigned_users !== '') {
     whereClause[collectionKey] = assigned_users;
    }

    if (tenure !== '') {
      whereClause['days'] = tenure;    
    }

    if (amount !== '') {
    whereClause['required_amount'] = amount;
    }

    if (loan_id !== '') {
      whereClause['loan_id'] = loan_id; 
    }

    if (name !== '') {
      whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no !== '') {
      whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type !== '') {
      whereClause2['user_type'] = user_type;
    }

    if (email !== '') {
      whereClause2['email'] = email; 
    }

    if (id_number !== '') {
      whereClause3['adhaar_no'] = id_number; 
    }
    
    let queryObject = {
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no','user_type'],
        where:whereClause2
      },
      {
        model: db.models.user,
        as: 'appUserReviewer_1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'appUserReviewer_2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'customerCare', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'S3', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'M1', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'M2', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.user,
        as: 'collectionManager', 
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.models.loanStatus, 
        attributes: ['status_id', 'status'],
      },
      {      
        model: db.models.appKycDetails, 
        attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
        where: whereClause3 
      } 
    ],
    attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
    order: [["id", "DESC"]],
    where: whereClause 
   }

    var applyloanCount = await db.models.appApplyLoan.count(queryObject);
    
    if (!isExport) {
      queryObject['limit'] = Number(limit);
      queryObject['offset'] = Number(offset);  
    }

 
    var applyloan = await db.models.appApplyLoan.findAll(queryObject);

    res.json({ message: 'Collection Record found', error: false, data: applyloan, total: applyloanCount});
  }) 

// Search Filter of Customer details module.

exports.getSearchCustomerDetailsLoan = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query; 
    const { from_date, to_date, loan_id, name, email, mobile_no, user_type, tenure, status, amount, id_number, reviewer, assigner, limit, offset } = query;  
    let  user = {}
    let  reviewers = {}

    if(assigner != ""){ 
        user = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assigner
            }
        });
    }


    if(reviewer != ""){ 
    reviewers = await db.models.user.findAll({
        attributes: ['id'],
        where: {
          deleted_at: null, 
          has_role:reviewer
        }
    });
    }

    let whereClause = { deleted_at:null }; 
    let whereClause2 = {};
    let whereClause3 = {};

    if(from_date !== '') {
      whereClause['apply_date'] = { [Op.gte]: `${from_date} 00:00:00`};
    }

    if(user.has_role == 4) { 
      whereClause['status'] = 0;
      whereClause['reviewer_1']  = assigner;
    } 

    if (user.has_role == 5){ 
      whereClause['status'] = 1;
      whereClause['reviewer_2']  = assigner;
    } 

    if(to_date !== '') {
      whereClause['apply_date'] = { [Op.lte] : `${to_date} 23:59:59`};
    }

    if(from_date !== '' && to_date !== '') {
      whereClause['apply_date'] = { 
                                    [Op.gte] : `${from_date} 00:00:00`,
                                    [Op.lte] : `${to_date} 23:59:59`
                                  }
    }

    if(reviewer !== '') {
      const reviewCol = reviewer == 4 ? 'reviewer_1' : 'reviewer_2';
      whereClause[reviewCol] =  { [Op.in]: [reviewers.map(c=>c.id)] };
    }

    if (tenure !== '') {
      whereClause['days'] = tenure;    
    }

    if (amount !== '') {
    whereClause['required_amount'] = amount;
    }

    if (loan_id !== '') {
      whereClause['loan_id'] = loan_id; 
    }

    if (status !== '') {
      whereClause['status'] = status; 
    }


    if (name !== '') {
      whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no !== '') {
      whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type !== '') {
      whereClause2['user_type'] = user_type;
    }

    if (email !== '') {
      whereClause2['email'] = email; 
    }

    if (id_number !== '') {
      whereClause3['adhaar_no'] = id_number; 
    }
    const queryObject = {
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
                where: whereClause2
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            },
            {      
                model: db.models.appKycDetails, 
                attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
                where: whereClause3 
            } 
        ], 
        attributes: [
            "id","user_id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at", 'disbursed_date'
        ], 
        order: [["id", "DESC"]],
        where: whereClause,
    }

    const applyLoanTotalCount = await db.models.appApplyLoan.count(queryObject); 

    queryObject['offset'] = Number(offset) 
    queryObject['limit'] = Number(limit) 

    const applyLoan = await db.models.appApplyLoan.findAll(queryObject); 
    const applyLoans = [];

    for (const element of applyLoan) { 
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status: 4
            }
        });

        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        }); 

        let reapply;
        if (_.isEmpty(countTodayFreshLoan) == false 
            && users[0].status == 4){ 
            reapply = "RE"
        } else {
            reapply = "" 
        } 

        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            apply_date:element.apply_date,
            disbursed_date:element.disbursed_date,
            days:element.days,
            status:element.loanStatus.status,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2,
            firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
            secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].customer_care != 0 ? "OD":"",
            disbursed_date: element.disbursed_date
        })   
    };  
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoans,
        total: applyLoanTotalCount
    });
});

// Search Filter of First Reviewer Module....

exports.searchFirstReviewerLoans = catchAsync(async (req,res,next)=> {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;
    const { limit, offset } = req.params;
    const {from_date, to_date, loan_id, name,mobile_no,email,id_number,user_type,tenure,amount} = req.body;
    let whereClause = { deleted_at: null, status: 0, reviewer_1: user_id}
    let whereClause2 = {};
    let whereClause3 = {};
    
    if (from_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00"
      }
    }

    if (to_date != "") {
      whereClause['apply_date'] = {
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (from_date != "" && to_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00",
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (loan_id != '') {
      whereClause['loan_id'] = loan_id;
    }

    if (tenure != '') {
      whereClause['days'] = tenure;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }


    if (email != '') {
        whereClause2['email'] = email;
    }

    if (name != '') {
        whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no != '') {
        whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (id_number != '') {
        whereClause3['adhaar_no'] = id_number;
    }

    const queryObject = {
       include: [{
          model: db.models.appUser, 
          attributes: ['username', 'email','mobile_no','user_type'],
          where:whereClause2
        },
        {
          model: db.models.user,
          as: 'appUserReviewer_1', 
          attributes: ['firstname', 'lastname'],
        }, 
        {
          model: db.models.loanStatus, 
          attributes: ['status_id', 'status'],
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
            where: whereClause3 
      }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: whereClause 
    }
    const count = await db.models.appApplyLoan.count(queryObject);

    queryObject.limit = Number(limit);
    queryObject.offset = Number(offset);

    const applyloan = await db.models.appApplyLoan.findAll(queryObject);


    const applyLoans = [];

    for (const element of applyloan) {
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status: 4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });  
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        } 
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            apply_date:element.apply_date,
            days:element.days,
            status:element.loanStatus.status,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2,
            firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
            secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].customer_care != 0 ? "OD":"",
        })   
    };

    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoans,
        total: count
    });
      
})
 
// Search Filter of Second Reviewer Module....

exports.searchSecondReviewerLoans = catchAsync(async (req,res,next)=> {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;
    const { limit, offset } = req.params;
    const {from_date, to_date, loan_id, name,mobile_no,email,id_number,user_type,tenure,amount} = req.body;
    let whereClause = { deleted_at: null, status:1, reviewer_2:user_id}
    let whereClause2 = {};
    let whereClause3 = {};
    
    if (from_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00"
      }
    }

    if (to_date != "") {
      whereClause['apply_date'] = {
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (from_date != "" && to_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00",
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (loan_id != '') {
      whereClause['loan_id'] = loan_id;
    }

    if (tenure != '') {
      whereClause['days'] = tenure;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }


    if (email != '') {
        whereClause2['email'] = email;
    }

    if (name != '') {
        whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no != '') {
        whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (id_number != '') {
        whereClause3['adhaar_no'] = id_number;
    }

    const queryObject = {
       include: [{
          model: db.models.appUser, 
          attributes: ['username', 'email','mobile_no','user_type'],
          where:whereClause2
        },
        {
          model: db.models.user,
          as: 'appUserReviewer_1', 
          attributes: ['firstname', 'lastname'],
        }, 
        {
          model: db.models.loanStatus, 
          attributes: ['status_id', 'status'],
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
            where: whereClause3 
      }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: whereClause 
    }
    const count = await db.models.appApplyLoan.count(queryObject);

    queryObject.limit = Number(limit);
    queryObject.offset = Number(offset);

    const applyloan = await db.models.appApplyLoan.findAll(queryObject);
 
    const applyLoans = [];  
    for (const element of applyloan) {
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status : 4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        }   
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            apply_date:element.apply_date,
            days:element.days,
            status:element.loanStatus.status,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2,
            // firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
            secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].customer_care != 0 ? "OD":"",
        })   
    };
    res.json({ message: "Apply Loan found", error: false, data: applyLoans });
})

// Search Filter of Case Review Module....

exports.getSearchCaseReviewLoan = catchAsync(async (req,res,next)=> {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;   
    let whereAssigner; 
    let team;
    let whereClause = {deleted_at: null, status: [1,2,3,5,6]}; 
    let whereClause2 = {};  
    var whereClause3 = {};
    const query = url.parse(req.url, true).query;
    const {from_date, to_date, loan_id, name, email, mobile_no, user_type, tenure, status, amount, id_number, reviewer, assigner, limit, offset} = query;  
    
    if(reviewer !== '' && assigner == '') {
      const reviewCol = reviewer == 4 ? 'reviewer_1' : 'reviewer_2';
      whereClause[reviewCol] =  { [Op.ne]: null };
    }

    if(assigner != "" && reviewer == ''){ 
        const users = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assigner
            }
        }); 


        if(users.has_role == 4){ 
            whereClause['status'] = [1,2]
            whereClause['reviewer_1'] = assigner
        } else if(users.has_role == 5){ 
          whereClause['status'] = [3,5,6]
          whereClause['reviewer_2'] = assigner
        } 
    } 

    if(reviewer !== '' && assigner != '') {
      const reviewCol = reviewer == 4 ? 'reviewer_1' : 'reviewer_2';
      whereClause[reviewCol] =  assigner;
    }

    if(from_date !== '') {
      whereClause['apply_date'] = { [Op.gte]: `${from_date} 00:00:00`};
    }

    if(has_role == 4) { 
      whereClause['status'] = [1,2];
      whereClause['reviewer_1']  = user_id;
    } 

    if (has_role == 5){ 
      whereClause['status'] = [3,5,6];
      whereClause['reviewer_2']  = user_id;
    } 

    if(to_date !== '') {
      whereClause['apply_date'] = { [Op.lte] : `${to_date} 23:59:59`};
    }

    if(from_date !== '' && to_date !== '') {
      whereClause['apply_date'] = { 
                                    [Op.gte] : `${from_date} 00:00:00`,
                                    [Op.lte] : `${to_date} 23:59:59`
                                  }
    }



    if (tenure !== '') {
      whereClause['days'] = tenure;    
    }

    if (amount !== '') {
    whereClause['required_amount'] = amount;
    }

    if (loan_id !== '') {
      whereClause['loan_id'] = loan_id; 
    }

    if (name !== '') {
      whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no !== '') {
      whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type !== '') {
      whereClause2['user_type'] = user_type;
    }

    if (email !== '') {
      whereClause2['email'] = email; 
    }

    if (id_number !== '') {
      whereClause3['adhaar_no'] = id_number; 
    }

     if (status !== '') {
      whereClause['status'] = status; 
    }

    var queryObj = {
        include: [{
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email','mobile_no','user_type'],
          where: whereClause2
        },
        {
          model: db.models.user,
          as: 'appUserReviewer_1', 
          attributes: ['firstname', 'lastname'],
        }, 
        {
          model: db.models.loanStatus, 
          attributes: ['status_id', 'status'],
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
            where: whereClause3 
        } 
      ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'status', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: whereClause 
    }
    var count = await db.models.appApplyLoan.count(queryObj) 
    queryObj.limit = Number(limit);
    queryObj.offset = Number(offset);
    var applyLoan = await db.models.appApplyLoan.findAll(queryObj) 
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
        total: count
    }); 
})
 
// Search Filter of Overall customer Applied....

exports.getSearchOverAllCustomerLoan = catchAsync(async (req, res, next) => {    
    const query = url.parse(req.url, true).query;
    const {from_date, to_date, loan_id, name, email, mobile_no, user_type, tenure, status, amount, id_number, reviewer, assigner, limit, offset} = query;  
    var whereClause = { deleted_at:null }; 
    var whereClause2 = {};  
    var whereClause3 = {};

    if (status == '') {
       whereClause['status'] = [0,1,2,3,5,6];
    }

    if(reviewer != '' && assigner == '') {
       whereClause[reviewer == 4 ? 'reviewer_1' : 'reviewer_2'] = {
          [Op.ne] : null
        };
    }


    if(assigner != "" && reviewer == ''){ 
        const users = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assigner
            }
        }); 

        whereClause[users.has_role == 4 ? 'reviewer_1': 'reviewer_2'] = assigner;
    }

    if(assigner != "" && reviewer != ''){ 
        whereClause[reviewer == 4 ? 'reviewer_1' : 'reviewer_2'] = assigner;
    }

   

    
    if (from_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00"
      }
    }

    if (to_date != "") {
      whereClause['apply_date'] = {
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (from_date != "" && to_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00",
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (loan_id != '') {
      whereClause['loan_id'] = loan_id;
    }

    if (tenure != '') {
      whereClause['days'] = tenure;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }

    if (status != '') {
       whereClause['status'] = status;
    }

    if (email != '') {
        whereClause2['email'] = email;
    }

    if (name != '') {
        whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no != '') {
        whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (id_number != ''){
        whereClause3['adhaar_no'] = id_number;
    }

    

    const queryObject = {
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
                where: whereClause2
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            },
            {      
                model: db.models.appKycDetails, 
                attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
                where: whereClause3 
            }  
        ], 
        attributes: [
            "id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at",
        ], 
        order: [["id", "DESC"]],
        where: whereClause,
    }

    const countLoan = await db.models.appApplyLoan.count(queryObject)
    queryObject.limit = Number(limit)
    queryObject.offset = Number(offset) 
    const applyLoan = await db.models.appApplyLoan.findAll(queryObject);
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan, 
        total :countLoan 
    });
});

// Search Filter of Approval Report.......... 
exports.getSearchApprovalReportLoan = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query;

    const {from_date, to_date, loan_id, name, email, mobile_no, user_type, tenure, status, amount, id_number,reviewer,assigner, limit, offset} = query;
   
    var whereClause = { deleted_at:null }; 
    var whereClause2 = {};  
    var whereClause3 = {};

    if (status == '') {
       whereClause['status'] = [1,2,3,5];
    }


    if(reviewer != '' && assigner == '') {
       whereClause[reviewer == 4 ? 'reviewer_1' : 'reviewer_2'] = {
          [Op.ne] : null
        };
    }

    if(reviewer != '' && assigner != '') {
       whereClause[reviewer == 4 ? 'reviewer_1' : 'reviewer_2'] = assigner;
    }

    if(assigner != "" && reviewer == '') { 
        const users = await db.models.user.findOne({
            attributes: ['id', 'firstname', 'lastname', "has_role", "user_type"],
            where: {
              deleted_at: null, 
              id:assigner
            }
        }); 

        whereClause[users.has_role == 4 ? 'reviewer_1': 'reviewer_2'] = assigner; 
    }
    
    if (from_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00"
      }
    }

    if (to_date != "") {
      whereClause['apply_date'] = {
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (from_date != "" && to_date != "") {
      whereClause['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00",
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (loan_id != '') {
      whereClause['loan_id'] = loan_id;
    }

    if (tenure != '') {
      whereClause['days'] = tenure;
    }

    if (amount != '') {
      whereClause['required_amount'] = amount;
    }

    if (status != '') {
       whereClause['status'] = status;
    }

    if (email != '') {
        whereClause2['email'] = email;
    }

    if (name != '') {
        whereClause2['username'] = { [Op.substring] : name };
    }

    if (mobile_no != '') {
        whereClause2['mobile_no'] = mobile_no;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (user_type != '') {
        whereClause2['user_type'] = user_type;
    }

    if (id_number != ''){
        whereClause3['adhaar_no'] = id_number;
    }

    const queryObject = {
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
                where: whereClause2
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            },
            {      
                model: db.models.appKycDetails, 
                attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
                where: whereClause3 
            }  
        ], 
        attributes: [
            "id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at",
        ], 
        order: [["id", "DESC"]],
        where: whereClause,
    }

    const countLoan = await db.models.appApplyLoan.count(queryObject);

    queryObject.limit = Number(limit)
    queryObject.offset = Number(offset) 

    const applyLoan = await db.models.appApplyLoan.findAll(queryObject); 

     

    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
        total: countLoan 
    });
});

exports.individualAchievements = catchAsync(async (req, res, next) => { 
    
    const { collection_team, from_date, to_date } = req.body;
    
    db.models.user.belongsTo(db.models.appApplyLoan, { 
      foreignKey: 'id', targetKey: collection_team
    });

    const achieveMents = await db.models.user.findAll({
        include: [{
          model: db.models.appApplyLoan,
          as: 'appApplyLoan',
          where:{
            apply_date: { 
                        [Op.gte]: from_date + " 00:00:00",
                        [Op.lte]: to_date + " 23:59:59"
                    },
          }
        }],
        attributes: [
            "id", "firstname", "lastname", "email", "mobile_no",[db.fn('COUNT', db.col('appApplyLoan.loan_id')), 'collection']
        ],
        group:['id'],
        where: {
            deleted_at: null,
            active: 1
        },
    });
    
    res.json({
        message: "Data found",
        error: false,
        data: achieveMents, 
    });
});

// Get Collection Achivement 

exports.getAchivement = catchAsync(async (req, res, next) => { 
    
    const users = await db.models.user.findAll({
        attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
        where: {
          deleted_at: null,  
          user_type: [3]
        }
    }); 

    const achivementData = [];
    for (const user of users) {   
        let whereClause;
        let whereClause2;
        let role; 
        switch (true) {
            case user.has_role == 6:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    collection_manager:user.id,  
                } 
                role = "Collection Manager";
                break;
            case user.has_role == 7:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    customer_care:user.id,
                    s1:0  
                } 
                role = "Customer Care";
                break;
            case user.has_role == 8:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    s1:user.id,
                    s2:0  
                }
                role = "S1";
                break;
            case user.has_role == 9:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    s2:user.id,
                    s3:0  
                }
                role = "S2";
                break;
            case user.has_role == 10:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    s3:user.id,
                    m1:0  
                }
                role = "S3";
                break;
            case user.has_role == 11:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    m1:user.id,
                    m2:0  
                }
                role = "M1";
                break;
            case user.has_role == 12:
                whereClause = {
                    deleted_at: null,
                    status:3,
                    m2:user.id,
                    collection_manager:0  
                }
                role = "M2";
                break;
            default:
                break;
        } 
        const AssignLoan = await db.models.appApplyLoan.count({ 
            where: whereClause
        });
        let status = "status";
        whereClause2 = whereClause;
        whereClause2[status] = 4;
        
        const CollectLoan = await db.models.appApplyLoan.count({ 
            where: whereClause2
        });
        achivementData.push({
            id:user.id,
            username: user.firstname+" "+user.lastname,
            user_role: role,
            email: user.email,
            mobile_no:user.mobile_no,
            assing_loan: AssignLoan,
            collect_loan: CollectLoan,
            user_status: user.active == 1 ? 'Active': 'Inactive'
        })
    }
    if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Collection Achivement Loan found",
        error: false,
        data: achivementData, 
    }); 
});

// Get Search Collection Achivement

exports.getSearchAchivement = catchAsync(async (req, res, next) => { 
    const query = url.parse(req.url, true).query;
    const { from_date, to_date, collection_team, assigned_users } = query;  
    if(from_date != "" && to_date != "" && collection_team == ""){
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [3]
            }
        }); 
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let role; 
            switch (true) {
                case user.has_role == 7:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        customer_care:user.id,
                        s1:0  
                    }
                    whereClause2 = {
                        deleted_at: null,
                        status:4,
                        customer_care:user.id,
                        s1:0  
                    }
                    role = "Customer Care";
                    break;
                case user.has_role == 8:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s1:user.id,
                        s2:0  
                    }
                    role = "S1";
                    break;
                case user.has_role == 9:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s2:user.id,
                        s3:0  
                    }
                    role = "S2";
                    break;
                case user.has_role == 10:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s3:user.id,
                        m1:0  
                    }
                    role = "S3";
                    break;
                case user.has_role == 11:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m1:user.id,
                        m2:0  
                    }
                    role = "M1";
                    break;
                case user.has_role == 12:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m2:user.id,
                        collection_manager:0  
                    }
                    role = "M2";
                    break;
                default:
                    break;
            }  
            whereClause.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            });
            let status = "status";
            whereClause2 = whereClause;
            whereClause2.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            whereClause2[status] = 4; 
            const CollectLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
         
            achivementData.push({
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignLoan,
                collect_loan: CollectLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        }); 
    }else if(from_date != "" && to_date != "" && collection_team != "" && assigned_users == ""){ 
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [3],
              has_role : collection_team
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let role; 
            switch (true) {
                case user.has_role == 7:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        customer_care:user.id,
                        s1:0  
                    } 
                    role = "Customer Care";
                    break;
                case user.has_role == 8:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s1:user.id,
                        s2:0  
                    }
                    role = "S1";
                    break;
                case user.has_role == 9:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s2:user.id,
                        s3:0  
                    }
                    role = "S2";
                    break;
                case user.has_role == 10:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s3:user.id,
                        m1:0  
                    }
                    role = "S3";
                    break;
                case user.has_role == 11:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m1:user.id,
                        m2:0  
                    }
                    role = "M1";
                    break;
                case user.has_role == 12:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m2:user.id,
                        collection_manager:0  
                    }
                    role = "M2";
                    break;
                default:
                    break;
            }  
            whereClause.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            });
            let status = "status";
            whereClause2 = whereClause;
            whereClause2.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            whereClause2[status] = 4; 
            const CollectLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
         
            achivementData.push({
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignLoan,
                collect_loan: CollectLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        }); 
    }else if(from_date != "" && to_date != "" && collection_team != "" && assigned_users != ""){ 
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [3],
              has_role : collection_team,
              id:assigned_users
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let role; 
            switch (true) {
                case user.has_role == 7:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        customer_care:user.id,
                        s1:0  
                    } 
                    role = "Customer Care";
                    break;
                case user.has_role == 8:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s1:user.id,
                        s2:0  
                    }
                    role = "S1";
                    break;
                case user.has_role == 9:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s2:user.id,
                        s3:0  
                    }
                    role = "S2";
                    break;
                case user.has_role == 10:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s3:user.id,
                        m1:0  
                    }
                    role = "S3";
                    break;
                case user.has_role == 11:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m1:user.id,
                        m2:0  
                    }
                    role = "M1";
                    break;
                case user.has_role == 12:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m2:user.id,
                        collection_manager:0  
                    }
                    role = "M2";
                    break;
                default:
                    break;
            }  
            whereClause.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            });
            let status = "status";
            whereClause2 = whereClause;
            whereClause2.payable_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            whereClause2[status] = 4; 
            const CollectLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
         
            achivementData.push({
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignLoan,
                collect_loan: CollectLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });  
    }else if(from_date == "" && to_date == "" && collection_team != "" && assigned_users == ""){
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [3],
              has_role : collection_team
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let role; 
            switch (true) {
                case user.has_role == 7:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        customer_care:user.id,
                        s1:0  
                    } 
                    role = "Customer Care";
                    break;
                case user.has_role == 8:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s1:user.id,
                        s2:0  
                    }
                    role = "S1";
                    break;
                case user.has_role == 9:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s2:user.id,
                        s3:0  
                    }
                    role = "S2";
                    break;
                case user.has_role == 10:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s3:user.id,
                        m1:0  
                    }
                    role = "S3";
                    break;
                case user.has_role == 11:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m1:user.id,
                        m2:0  
                    }
                    role = "M1";
                    break;
                case user.has_role == 12:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m2:user.id,
                        collection_manager:0  
                    }
                    role = "M2";
                    break;
                default:
                    break;
            }   
            const AssignLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            });
            let status = "status";
            whereClause2 = whereClause; 
            whereClause2[status] = 4; 
            const CollectLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
         
            achivementData.push({
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignLoan,
                collect_loan: CollectLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });
    }else{
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [3],
              has_role : collection_team,
              id:assigned_users
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let role; 
            switch (true) {
                case user.has_role == 7:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        customer_care:user.id,
                        s1:0  
                    } 
                    role = "Customer Care";
                    break;
                case user.has_role == 8:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s1:user.id,
                        s2:0  
                    }
                    role = "S1";
                    break;
                case user.has_role == 9:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s2:user.id,
                        s3:0  
                    }
                    role = "S2";
                    break;
                case user.has_role == 10:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        s3:user.id,
                        m1:0  
                    }
                    role = "S3";
                    break;
                case user.has_role == 11:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m1:user.id,
                        m2:0  
                    }
                    role = "M1";
                    break;
                case user.has_role == 12:
                    whereClause = {
                        deleted_at: null,
                        status:3,
                        m2:user.id,
                        collection_manager:0  
                    }
                    role = "M2";
                    break;
                default:
                    break;
            }  
            const AssignLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            });
            let status = "status";
            whereClause2 = whereClause; 
            whereClause2[status] = 4; 
            const CollectLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
         
            achivementData.push({
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignLoan,
                collect_loan: CollectLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });
    }
});

// Get Approver Achivement

exports.getApproverAchivement = catchAsync(async (req, res, next) => { 
    
    const users = await db.models.user.findAll({
        attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
        where: {
          deleted_at: null,  
          user_type: [2],
          has_role: [4,5]
        }
    });
 
    const achivementData = [];
    for (const user of users) {   
        let whereClause;
        let whereClause2;
        let whereClause3;
        let role; 
        switch (true) {
            case user.has_role == 4:
                whereClause = {
                    deleted_at: null,
                    status:0,
                    reviewer_1:user.id, 
                } 
                whereClause2 = {
                    deleted_at: null,
                    status:[1,3,4,5], 
                    reviewer_1:user.id,  
                }
                whereClause3 = {
                    deleted_at: null,
                    status:2,
                    reviewer_1:user.id, 
                }
                role = "First Reviewer";
                break;
            case user.has_role == 5:
                whereClause = {
                    deleted_at: null,
                    status:1,
                    reviewer_2:user.id, 
                } 
                whereClause2 = {
                    deleted_at: null,
                    status: [3,4,8], 
                    reviewer_2:user.id,  
                }
                whereClause3 = {
                    deleted_at: null,
                    status:5,
                    reviewer_2:user.id, 
                }
                role = "Second Reviewer";
                break; 
            default:
                break;
        } 
        const AssignedLoan = await db.models.appApplyLoan.count({ 
            where: whereClause
        });
        
        const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
            where: whereClause2
        });

        const RejectedLoan = await db.models.appApplyLoan.count({ 
            where: whereClause3
        });
     
        achivementData.push({
            id:user.id,
            username: user.firstname+" "+user.lastname,
            user_role: role,
            email: user.email,
            mobile_no:user.mobile_no,
            assing_loan: AssignedLoan,
            approved_loan: ApprovedDisbursedLoan,
            rejected_loan: RejectedLoan,
            user_status: user.active == 1 ? 'Active': 'Inactive'
        })
    }
    if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Approver Achivement Loan found",
        error: false,
        data: achivementData, 
    }); 
});

// Get Search Approver Achivement

exports.getSearchApproverAchivement = catchAsync(async (req, res, next) => { 
    const query = url.parse(req.url, true).query;
    const { from_date, to_date, collection_team, assigned_users } = query;  
    if(from_date != "" && to_date != "" && collection_team == ""){
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [2],
              has_role: [4,5]
            }
        }); 
        const achivementData = [];
        for (const user of users) {  
            let whereClause;
            let whereClause2;
            let whereClause3;
            let role; 
            switch (true) {
                case user.has_role == 4:
                    whereClause = {
                        deleted_at: null,
                        status:0,
                        reviewer_1:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[1,3,4,5], 
                        reviewer_1:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:2,
                        reviewer_1:user.id, 
                    }
                    role = "First Reviewer";
                    break;
                case user.has_role == 5:
                    whereClause = {
                        deleted_at: null,
                        status:1,
                        reviewer_2:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[3,4,8], 
                        reviewer_2:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:5,
                        reviewer_2:user.id, 
                    }
                    role = "Second Reviewer";
                    break; 
                default:
                    break;
            }   
            whereClause.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            }); 
            whereClause2.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
            whereClause3.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const RejectedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause3
            });
         
            achivementData.push({
                id:user.id,
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignedLoan,
                approved_loan: ApprovedDisbursedLoan,
                rejected_loan: RejectedLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Approver Achivement Loan found",
            error: false,
            data: achivementData, 
        }); 
    }else if(from_date != "" && to_date != "" && collection_team != "" && assigned_users == ""){ 
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [2],
              has_role : collection_team
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let whereClause3;
            let role; 
            switch (true) {
                case user.has_role == 4:
                    whereClause = {
                        deleted_at: null,
                        status:0,
                        reviewer_1:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[1,3,4,5], 
                        reviewer_1:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:2,
                        reviewer_1:user.id, 
                    }
                    role = "First Reviewer";
                    break;
                case user.has_role == 5:
                    whereClause = {
                        deleted_at: null,
                        status:1,
                        reviewer_2:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[3,4,8], 
                        reviewer_2:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:5,
                        reviewer_2:user.id, 
                    }
                    role = "Second Reviewer";
                    break; 
                default:
                    break;
            }   
            whereClause.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            }); 
            whereClause2.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
            whereClause3.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const RejectedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause3
            });
         
            achivementData.push({
                id:user.id,
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignedLoan,
                approved_loan: ApprovedDisbursedLoan,
                rejected_loan: RejectedLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        }); 
    }else if(from_date != "" && to_date != "" && collection_team != "" && assigned_users != ""){ 
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [2],
              has_role : collection_team,
              id:assigned_users
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let whereClause3;
            let role; 
            switch (true) {
                case user.has_role == 4:
                    whereClause = {
                        deleted_at: null,
                        status:0,
                        reviewer_1:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[1,3,4,5], 
                        reviewer_1:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:2,
                        reviewer_1:user.id, 
                    }
                    role = "First Reviewer";
                    break;
                case user.has_role == 5:
                    whereClause = {
                        deleted_at: null,
                        status:1,
                        reviewer_2:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[3,4,8],
                        reviewer_2:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:5,
                        reviewer_2:user.id, 
                    }
                    role = "Second Reviewer";
                    break; 
                default:
                    break;
            }   
            whereClause.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            }
            const AssignedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            }); 
            whereClause2.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
            whereClause3.apply_date = { 
                [Op.gte]: from_date + " 00:00:00",
                [Op.lte]: to_date + " 23:59:59"
            } 
            const RejectedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause3
            });
         
            achivementData.push({
                id:user.id,
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignedLoan,
                approved_loan: ApprovedDisbursedLoan,
                rejected_loan: RejectedLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });  
    }else if(from_date == "" && to_date == "" && collection_team != "" && assigned_users == ""){
         
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [2],
              has_role : collection_team
            }
        });
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let whereClause3;
            let role; 
            switch (true) {
                case user.has_role == 4:
                    whereClause = {
                        deleted_at: null,
                        status:0,
                        reviewer_1:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[1,3,4,5], 
                        reviewer_1:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:2,
                        reviewer_1:user.id, 
                    }
                    role = "First Reviewer";
                    break;
                case user.has_role == 5:
                    whereClause = {
                        deleted_at: null,
                        status:1,
                        reviewer_2:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[3,4,8], 
                        reviewer_2:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:5,
                        reviewer_2:user.id, 
                    }
                    role = "Second Reviewer";
                    break; 
                default:
                    break;
            }   
             
            const AssignedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            }); 
             
            const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
             
            const RejectedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause3
            });
         
            achivementData.push({
                id:user.id,
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignedLoan,
                approved_loan: ApprovedDisbursedLoan,
                rejected_loan: RejectedLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });
    }else{ 
        const users = await db.models.user.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'mobile_no', 'active', 'has_role', 'user_type'],
            where: {
              deleted_at: null,  
              user_type: [2],
              has_role : collection_team,
              id:assigned_users
            }
        }); 
        const achivementData = [];
        for (const user of users) {   
            let whereClause;
            let whereClause2;
            let whereClause3;
            let role; 
            switch (true) {
                case user.has_role == 4:
                    whereClause = {
                        deleted_at: null,
                        status:0,
                        reviewer_1:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[1,3,4,5], 
                        reviewer_1:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:2,
                        reviewer_1:user.id, 
                    }
                    role = "First Reviewer";
                    break;
                case user.has_role == 5:
                    whereClause = {
                        deleted_at: null,
                        status:1,
                        reviewer_2:user.id, 
                    } 
                    whereClause2 = {
                        deleted_at: null,
                        status:[3,4,8], 
                        reviewer_2:user.id,  
                    }
                    whereClause3 = {
                        deleted_at: null,
                        status:5,
                        reviewer_2:user.id, 
                    }
                    role = "Second Reviewer";
                    break; 
                default:
                    break;
            }   
             
            const AssignedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause
            }); 
              
            const ApprovedDisbursedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause2
            });
              
            const RejectedLoan = await db.models.appApplyLoan.count({ 
                where: whereClause3
            });
         
            achivementData.push({
                id:user.id,
                username: user.firstname+" "+user.lastname,
                user_role: role,
                email: user.email,
                mobile_no:user.mobile_no,
                assing_loan: AssignedLoan,
                approved_loan: ApprovedDisbursedLoan,
                rejected_loan: RejectedLoan,
                user_status: user.active == 1 ? 'Active': 'Inactive'
            })
        }
        if (JSON.stringify(achivementData) == "[]" ? 1 : 0)
            return next(new AppError("Not Found", 404));
        res.json({
            message: "Achivement Loan found",
            error: false,
            data: achivementData, 
        });
    }
})

// exports.getExportDB = catchAsync(async (req, res, next) => { 
//     const c_Date = moment().format('YYYY_MM_DD');
//     const d_Date = moment().subtract(2, 'days').format('YYYY_MM_DD');
// console.log("11111111111111111111", d_Date);
//     const dbBackup = () => {
//         const d_file = `${process.env.DB_NAME}_${d_Date}.sql`
//         const fileName = `${process.env.DB_NAME}_${c_Date}.sql`
//         mysqldump({
//             connection: {
//                 host: process.env.DB_HOST,
//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASS,
//                 database: process.env.DB_NAME,
//             },
//             dumpToFile: `./uploads/database_Backup/${fileName}`,
//             compressFile: true
//         });
//         fs.unlink(`./uploads/database_Backup/${d_file}`, (err) => {
//         if (err) return
//         console.log('file deleted successfully');
//         })
//     }
//     console.log("DB", dbBackup);
// });

exports.addReminder = catchAsync(async (req, res, next) => { 
    const {choose_date, description, loan_id} = req.body;
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const reminder = await db.models.addReminder.create({
        user_id:user_id,
        choose_date: choose_date,
        description: description,
        loan_id: loan_id,
        status:0
    });
    if (!reminder) return next(new AppError('Reminder Not Saved', 404))
    res.json({ message: 'Reminder Saved Successfully', error: false, data: reminder });
})


exports.getReminder = catchAsync(async (req, res, next) => { 
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const reminder = await db.models.addReminder.findAll({
        where: {
            user_id:user_id,
            status:0
        }
    });
    if (!reminder.length) return next(new AppError('data not fetched', 404))
    res.json({ message: 'data fetched Successfully', error: false, data: reminder });
});

exports.doneReminder = catchAsync(async (req, res, next) => { 
    const {id} = req.body;
    const updated = await db.models.addReminder.update(
        {
            status:1, 
            updated_at:moment().format('YYYY-MM-DD')
        },
        {
            where: {
            id
           }
        }
    );
    if (!updated) return next(new AppError('Reminder Action failed to Update ', 404))
    res.json({ message: 'Reminder Action done Successfully', error: false, data: updated });
});

exports.getTenures = catchAsync(async (req, res, next) => { 
    const days = await db.models.appApplyLoan.findAll({
         attributes: ['days'],
         group: ['days'],
         where:{
           deleted_at: null
         }
    });
    if (!days) {
      res.json({ message: '', error: false, data: [] });
    } else {
    const data = days.map((each,index)=>({id:index+1,days:each.days})).sort((a,b)=>a.days>b.days?1:-1).filter(c=>c.days!==0)
      res.json({ message: '', error: false, data });
    }
    
});

exports.saveExtensionDeal = catchAsync(async (req, res, next) => {
        
        let extension;
        if (req.body.id){
          await db.models.appExtensionDeal.update({
          tenure:req.body.tenure,
          amount:req.body.amount,
          user_type:req.body.user_type,
          level:req.body.level,
          status: req.body.status ? 1: 0  
         },{
            where:{
                id:req.body.id
            }
         })  
        } else {
         await db.models.appExtensionDeal.create({
          tenure:req.body.tenure,
          amount:req.body.amount,
          user_type:req.body.user_type,
          level:req.body.level,
          status: req.body.status ? 1: 0,  
         })  
        }
        
        let msg = req.body.id? 'updated': 'added';
        if (!extension) {
            res.json({ message: `extension not ${msg} sucessfully`, error: true, data: {}})
        }
        res.json({ message: `extension ${msg} sucessfully`, error: false, data: extension
  });
});



exports.allExtensionDeal = catchAsync(async (req, res, next) => {
        const extension = await db.models.appExtensionDeal.findAll({
         where: {
            deleted_at: null
         } 
        })
        if (!extension.length) return next(new AppError('Not Found', 404))
        res.json({ message: 'extension  add sucessfully', error: false, data: extension
  });
});




exports.deleteExtensionDeal = catchAsync(async (req, res, next) => {
        const extension = await db.models.appExtensionDeal.update(
         {
            deleted_at: moment().format('YYYY-MM-DD')
         },
         {
            where: {
            id: req.query.id
         }
         } 
        )
        if (!extension) return next(new AppError('Not Found', 404))
        res.json({ message: 'deleted sucessfully', error: false, data: extension
  });
});

exports.updateStatusExtensionDeal = catchAsync(async (req, res, next) => {
        const extension = await db.models.appExtensionDeal.update(
         {
            status: req.body.status?1:0,
            updated_at: moment().format('YYYY-MM-DD')
         },
         {
            where: {
            id: req.body.id
          }
         } 
        )
        if (!extension) return next(new AppError('Not Found', 404))
        res.json({ message: 'updated sucessfully', error: false, data: extension
  });
});

exports.getAmountByTenure = catchAsync(async (req, res, next) => {
        const extension = await db.models.appExtensionDeal.findOne({
           attributes: ['amount'],
            where: {
            tenure: req.query.tenure,
            deleted_at: null,
            status:1
          }
        })
        if (!extension)  res.json({ message: 'Amount not found sucessfully', error: false, data: ''});
        res.json({ message: 'Amount found sucessfully', error: false, data: extension});
});



exports.getDeals = catchAsync(async (req, res, next) => {
    const decoded = jwt_decode(req.headers.authorization);
    const type = decoded.user_type;
        const extension = await db.models.appExtensionDeal.findAll({
           attributes: ['id','tenure','amount'],
            where: {
            user_type: type,
            level: req.body.level,
            deleted_at: null,
            status:1
          }
        })
        if (!extension.length) return next(new AppError('Not Found', 404))
        res.json({ message: 'Amount found sucessfully', error: false, data: extension});
});