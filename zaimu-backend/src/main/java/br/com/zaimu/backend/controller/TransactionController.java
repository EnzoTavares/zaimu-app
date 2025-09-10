package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.entity.TransactionUser;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping
    public HttpResponse getUserTransactions() {
        try{
            transactionService.getUserTransactions();
            return new HttpResponse(HttpStatusEnum.success(), "chegou");
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping
    public HttpResponse create(
            @RequestBody TransactionUser transactionUser
    ) {
        try{
//            transactionService.createTransaction(transactionUser);
            return new HttpResponse(HttpStatusEnum.success(), "chegou");
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

}
