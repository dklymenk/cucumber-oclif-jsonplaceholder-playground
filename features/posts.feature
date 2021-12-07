Feature: Posts

  Scenario: I run the command to see current posts 
    Given a "GET" request to "https://jsonplaceholder.typicode.com/posts" returns
      """
      [
        {
          "title": "laboriosam dolor voluptates"
        },
        {
          "title": "temporibus sit alias delectus eligendi possimus magni"
        },
        {
          "title": "at nam consequatur ea labore ea harum"
        }
      ]
      """
    And a "POST" request to "https://jsonplaceholder.typicode.com/posts" returns status "201" and body
      """
      {

        "title": "test post title",
        "body": "test post body",
        "id": 101
      }
      """
    And I would reply with "test post title" to a "title" prompt
    And I would reply with "test post body" to a "body" prompt
    When I run the command
    Then the "POST" request to "https://jsonplaceholder.typicode.com/posts" should be sent with
      """
      {
        "title": "test post title",
        "body": "test post body"
      }
      """
    And I should see
      """
      Current post titles:
      laboriosam dolor voluptates
      temporibus sit alias delectus eligendi possimus magni
      at nam consequatur ea labore ea harum
      Created new post with title "test post title" and id 101

      """
