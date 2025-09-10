package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.entity.Transaction;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping
    public HttpResponse getUserTransactions() {
        try{
            List<Transaction> userTransactions = transactionService.getUserTransactions();
            return new HttpResponse(HttpStatusEnum.success(), userTransactions);
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping
    public HttpResponse create(
            @RequestBody Transaction transaction
    ) {
        try{
//            transactionService.createTransaction(transaction);
            return new HttpResponse(HttpStatusEnum.success(), "chegou");
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

}
