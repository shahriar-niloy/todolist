function profile(user) {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...( user.projects 
                ?   
                    {
                        projects: user.projects.map(up => ({
                            id: up.id, 
                            name: up.name
                        }))  
                    }
                :   {}
            )
    }
}

exports.profile = profile;