var db = require('../config/sequelize').db;
const {Op, QueryTypes} = require('sequelize'); 

/*finds reviewer id's for assigning to the loans, 
send list of all the reviewers as the first argument and list of all pending/1st 
review approved loans as the second argument.
send role type 5 for second reviewer 4 for first reviewer*/
const getReviewerId = (user, loanData, roleType) => {
  let reviewerData = [];
  user.forEach(e => reviewerData.push({userId: e.id, loanCount: 0}));
  loanData.forEach(e => {
    const index = reviewerData.findIndex(
      item => item.userId == (roleType === 4 ? e.reviewer_1 : e.reviewer_2)
    );
    if (index != -1) {
      reviewerData[index].loanCount += 1;
    }
  }); 
  reviewerData.sort((a, b) => a.loanCount - b.loanCount); 
  return reviewerData[0].userId;
}; 
const getCollectionUserId = async (team_name, roleId, loan_id, next_team_name) => { 
  console.log("TEam Name", team_name);
  console.log("Role Id", roleId);
  console.log("Next Team Name", next_team_name);
  console.log("Loan ID", loan_id);
   const users = await db.query(`SELECT id FROM (SELECT u.id, COUNT(l.id) as loan_count FROM vizzve_users AS u LEFT JOIN (SELECT * FROM vizzve_apply_loan WHERE status = 3 AND ${next_team_name} = 0) AS l ON u.ID = l.${team_name} WHERE u.has_role =:has_role AND u.user_type = 3 AND u.active = 1 GROUP BY u.id) as count_table ORDER BY loan_count ASC LIMIT 0,1`,{
     type:QueryTypes.SELECT,
     replacements:{has_role:roleId}
   }); 
    return users[0].id;
};

exports.getReviewer = getReviewerId;
exports.getCollectionUserId = getCollectionUserId;
