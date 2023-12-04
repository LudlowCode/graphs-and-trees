from turtle import *

def draw_tree(n):
    pensize(n)
    
    #draw the trunk
    forward(10*n)
    
    # base case so it doesn't go on forever
    if n==1:      
        pass
    
    #recursive case
    else:
        #remember where the tree forks so we can go back to that point
        fork_location = pos()
        trunk_angle = heading()
        
        #draw the left bough
        left(25)
        draw_tree(n-1)
        
        #go back to the fork
        penup()
        goto(fork_location)
        pendown()
        setheading(trunk_angle)
        
        #draw the right bough
        right(25)
        draw_tree(n-1)

draw_tree(5)
#wait for end
mainloop()