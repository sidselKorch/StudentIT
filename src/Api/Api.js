import Parse from 'parse/dist/parse.min.js';

export async function createChatList(email, coursetitle) {
    const List = Parse.Object.extend("Chat")
    const chatListObject = new List()

    // const chatListObject = Parse.Object("Chat")
    // l(list)

    let usersRelation = chatListObject.relation("users")
    usersRelation.add(Parse.User.current())
    // chatListObject.set("firstName", firstname)
    // chatListObject.set("lastName", lastname)
    chatListObject.set("email", email)
    chatListObject.set("courseTitle", coursetitle)
        try {
            const savedList = await chatListObject.save()
            console.log("CreateChatList(): ",savedList)
            return savedList
        } catch (error) {
            console.log("CreateChatList(): ",error)
        }
}


// async function getUser(username) {
//     const query = new Parse.Query("User")
//     query.equalTo("username", username)
//     try {
//         const user = await query.first()
//         console.log("getUser():", user)
//         return user
//     } catch (error) {
//         console.log("getUser(): ",error)
//     }
// }

// export async function getListObject(listId) {
//     const listQuery = new Parse.Query("Chat")
//     listQuery.equalTo("objectId", listId)
//     // listQuery.equalTo("objectId", "sJZa09qjA2")
//     try {
//         const chatListObject = await listQuery.first()
//         console.log("getListObject(): ",chatListObject)
//         return chatListObject
//     } catch (error) {
//         console.log("getListObject(): ",error)
//     }
// }

export async function addUserToList(username, listId) {
    const listQuery = new Parse.Query("Chat")
    listQuery.equalTo("objectId", listId)

    let chat = await listQuery.first()
    const user = await getUser(username)
    // l(list)
    // let usersRelation = chatListObject.relation("users")
    let usersRelation = chat.relation("users")
    usersRelation.add(user)
    try {
        const savedList = await chat.save()
        console.log("addUserToList(): ",savedList)
    } catch (error) {
        console.log("addUserToList(): ",error)
    }
}

export async function getUser(userId) {
    console.log("user id: ", userId)
    const query = new Parse.Query("User")
    query.equalTo("ObjectID", userId)
    console.log("query: ", query)
    try {
        const user = await query.first()
        console.log("getUser():", user)
        return user
    } catch (error) {
        console.log("getUser(): ",error)
    }
}

export async function getUserEmail(user) {
    console.log("user id: ", user)
    const query = new Parse.Query("User")
    console.log("query2", query)

    //query.equalTo("ObjectID", userId)
    query.equalTo("username", "Test@user.dk")
    try {
        const user = await query.first()
        console.log("getUser():", user)
        return user.getEmail()
    } catch (error) {
        console.log("getUser(): ",error)
    }
}

export async function getChatObject(userName, CourseTitle) {
    console.log("parsing in ", userName, CourseTitle)
    const query = new Parse.Query("Chat")
    if(userName === ""){
    query.equalTo("CourseTitle", CourseTitle)
    } else {
        query.equalTo("email", userName)
    }
    try{
        const chat = await query.first()
        console.log("chat", chat)
        console.log("getChatId():", chat)
        return chat
    } catch (error) {
        console.log("getChatId: ", error)
    }
}

export async function getCourse(course) {
    const query = new Parse.Query("Courses")
    query.equalTo("ObjectID", course)
    try {
        const course = await query.first()
        console.log("getCourse():", course)
        return course
    } catch (error) {
        console.log("getCourse(): ",error)
    }
}