var HelperUtil = {

  filterOptions: function(certificateCount, dateMap, categoryMap, updatedCourses){
    var resultList = {};
    resultList['Courses'] = updatedCourses;
    if(certificateCount > 0){
      resultList['Certificate'] = [{name: 'certificate',type: 'checkbox',count: certificateCount, disabled: certificateCount==0?'disabled':''}];
    }
    var dateOptionArray = new Array();
    Object.keys(dateMap).forEach(function(key){
      dateOptionArray.push({name: key,type: 'checkbox',count: dateMap[key],disabled: dateMap[key]==0?'disabled':''});
    });
    resultList['Start Date'] = dateOptionArray;
    var categoryOptionArray = new Array();
    Object.keys(categoryMap).forEach(function(key){
      categoryOptionArray.push({name: key,type: 'checkbox',count: categoryMap[key],disabled: categoryMap[key]==0?'disabled':''});
    });
    resultList['Category'] = categoryOptionArray; 
    return resultList;   
  },  

  analyzeResults: function(courses, searchTerm, res){
    var categoryFilter = ['Computer Science', 'Machine Learning', 'Programming', 'Engineering', 'Art & Design', 'Education & Teaching'];
    var certificateCount = 0; 
    var dateMap = {soon: 0, progress: 0, future: 0, self: 0}; 
    var categoryMap = {'Computer Science': 0, 'Machine Learning': 0, 'Programming': 0, 'Engineering': 0, 'Art & Design': 0, 'Education & Teaching': 0};
    var updatedCourses = new Array();
    courses.forEach(function(course){
      var option = '';
      if(course.certificate){
        certificateCount++;
        option += 'certificate';
      }
      var index = categoryFilter.indexOf(course.classification);
      if(categoryMap[categoryFilter[index]] != null){
        categoryMap[categoryFilter[index]]++;
        option += ' '+categoryFilter[index].replace(' ', '-');
      }
      if(course.selfPaced){
        dateMap['self']++;
        option += ' self';
      }else{
        var currentDate = Date.now();
        var courseDate = course.startDate;
        if(currentDate > courseDate){
          dateMap['progress']++;
          option += ' progress';
        }else if(currentDate < courseDate){
          dateMap['future']++;
          option += ' future';
        }else{
          dateMap['soon']++;
          option += ' soon';
        }
      }
      course.tags = option;
      updatedCourses.push(course);
    });
    return HelperUtil.filterOptions(certificateCount, dateMap, categoryMap, updatedCourses);
  }

};

module.exports = HelperUtil;
