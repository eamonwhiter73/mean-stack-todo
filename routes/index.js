
/*
 * GET home page.
 */

/*exports.index = function(req, res) {
  res.render('index', {
    title: 'Express'
  });
};*/

exports.index = function(Member) {
  return function(req, res) {
    Member.find({}, function(error, members) {
      res.render('index', {
        title: 'Express',
        members : members
      });
    });
  };
};

exports.addMember = function(Member) {
  return function(req, res) {
    var member = new Member(req.body);
      member.save(function(error, member) {
      if (error || !member) {
        res.json({ error : error });
      } else {
        res.json({ member : member });
      }
    });
  };
};

exports.get = function(Member) {
  return function(req, res) {
    Member.find({}, function(error, members) {
      res.json({ members : members });
    });
  }
};

exports.update = function(Member) {
  return function(req, res) {
    Member.findOne({ _id : req.params.id }, function(error, member) {
      if (error || !member) {
        res.json({ error : error });
      } else {
        member.done = req.body.done;
        member.save(function(error, member) {
          if (error || !member) {
            res.json({ error : error });
          } else {
            res.json({ member : member });
          }
        });
      }
    });
  }
};