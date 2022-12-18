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


async function getUser(username) {
    const query = new Parse.Query("User")
    query.equalTo("username", username)
    try {
        const user = await query.first()
        console.log("getUser():", user)
        return user
    } catch (error) {
        console.log("getUser(): ",error)
    }
}

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