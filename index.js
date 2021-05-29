var express = require('express')
var app =  express()

app.use(express.json())



var mentor = []
var student = []

//api to create mentor records

app.post('/create-mentor',(req,res)=>{
    mentor.push(req.body)
    mentor[mentor.length-1].mentor_id = mentor.length 
    res.status(200).json({
        message: 'mentor record created'
    })

    
})

//api to show mentor records

app.get('/show-mentor',(req,res)=>{

    res.status(200).json(mentor)


    
})

//api to create student records

app.post('/create-student',(req,res)=>{
    student.push(req.body)
    student[student.length-1].student_id = student.length                
    res.status(200).json({
        message: 'student record created'
    })

    
})


//api to show student records

app.get('/show-student',(req,res)=>{

    res.status(200).json(student)

    
})

//api that does not show a student who has a mentor or api that shows students without mentor

app.get('/show-student/without-mentor',(req,res)=>{
    function WithoutMentor(item){
        if(item.mentorAssigned == "nil")
        return item
    }
    res.status(200).json(student.filter(WithoutMentor))

    
})

//api to show all students for a particular mentor

app.get('/show-mentor/all-students',(req,res)=>{

    mentor.map((item)=>{
        if(item.mentor_id == req.body.mentorID)
        res.status(200).json(item.students)

    })
    
    
})


//api to assign or change a student to mentor and vice versa, to select one mentor and add multiple students, to select one student and assign one mentor


app.post('/assign-student-mentor',(req,res)=>{
    
    req.body.student_list.map((stu)=>{
        var count =0
        mentor.map((item)=>{
            
    
            item.students.map((ent)=>{
               
                if(ent.studentID==stu.studentID)
                {
                    var ind = item.students.indexOf(stu)   
                    item.students.splice(ind)                        //removes duplicates while assigning and changing mentors
                } 

            })



            if(item.mentor_id==req.body.mentorID){
         
                if(item.students == '')                              //condition when there are no students assigned to a mentor                 
                {
                    item.students.push(stu)                            
        
                    student.map((ele)=>{
                        if(ele.student_id == stu.studentID){
                        ele.mentorAssigned = req.body.mentorName     //simultaenously updates student record about the mentor change when there is a student assignment to a mentor
                        }
                    })
  
                    res.status(200).json({
                        message: mentor
                    })
                }
                else{
                item.students.map((ite)=>{                           //condition when there are already multiple students to a mentor
                
                   if(ite.studentID != stu.studentID )
                    {count++
                   }
                     if(count==item.students.length)  
                   {
                    
                    item.students.push(stu)              
                
                    student.map((ele)=>{
                        if(ele.student_id == stu.studentID){
                        ele.mentorAssigned = req.body.mentorName    //simultaenously updates student record about the mentor change when there is a student assignment to a mentor
                        }
                    })
               
                    res.status(200).json({
                        message: mentor
                    })

                }

                })}}
        }
        )


    })
    



    
})










app.listen(process.env.PORT||3000)




