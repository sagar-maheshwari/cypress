#pull image
FROM cypress/included:9.4.1
# make directory inside container
RUN mkdir /tests
WORKDIR /tests
# copy files from host to container
COPY . .
# execute the tests
RUN yarn
RUN yarn cypress verify
# execute tests on different browsers
RUN yarn cypress run --browser chrome
RUN yarn cypress run --browser firefox
RUN yarn cypress run --browser edge